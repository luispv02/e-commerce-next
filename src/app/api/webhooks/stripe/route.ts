import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";


export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[stripe] Falta configurar STRIPE_WEBHOOK_SECRET.");
    return NextResponse.json(
      { message: "Error de configuración del webhook." },
      { status: 500 },
    );
  }

  if (!signature) {
    return NextResponse.json(
      { message: "Falta la firma de Stripe." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    const payload = await request.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("[stripe] Firma de webhook inválida:", error instanceof Error ? error.message : error);
    return NextResponse.json({ message: "Firma inválida." }, { status: 400 });
  }

  console.log("[stripe] Evento:", event.type, event.id);

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await handlePaid(event.data.object);
        break;

      case "checkout.session.expired":
      case "checkout.session.async_payment_failed":
        await handleCancelled(event.data.object);
        break;

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`[stripe] Error procesando ${event.type}:`, error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: "Error al procesar el evento." },
      { status: 500 },
    );
  }
}

// Mark the order as paid when Stripe confirms the payment.
async function handlePaid(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return;

  const orderId = session.metadata?.orderId;

  if (!orderId) {
    console.error(`[stripe] Sesión ${session.id} pagada sin metadata.orderId.`);
    return;
  }

  if (session.mode !== "payment" || session.client_reference_id !== orderId) {
    console.error(`[stripe] Sesión ${session.id} con modo o referencia inválidos.`);
    return;
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      stripeSessionId: session.id
    },
    select: { id: true, total: true, status: true },
  });

  if (!order) {
    console.error(`[stripe] Sesión ${session.id} sin orden asociada (orderId: ${orderId}).`);
    return;
  }

  if (order.status === "PAID") return;

  const expectedAmount = Math.round(Number(order.total) * 100);

  if (session.currency !== "mxn" || session.amount_total !== expectedAmount) {
    console.error(
      `[stripe] Importe/moneda no coinciden en orden ${order.id}: ` +
      `esperado ${expectedAmount} mxn, cobrado ${session.amount_total} ${session.currency}.`,
    );
    return;
  }

  const { count } = await prisma.order.updateMany({
    where: {
      id: order.id,
      stripeSessionId: session.id,
      status: "PENDING"
    },
    data: {
      status: "PAID",
      paidAt: new Date()
    },
  });

  if (count === 0) {
    const current = await prisma.order.findUnique({
      where: { id: order.id },
      select: { status: true },
    });

    if (current?.status !== "PAID") {
      console.error(
        `[stripe] Pago recibido para orden ${order.id} en estado ${current?.status}. ` +
        `Revisar y reembolsar si corresponde (session: ${session.id}).`,
      );
    }
  }
}

// Cancel a pending order and return the reserved stock
async function handleCancelled(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    console.error(`[stripe] Sesión ${session.id} sin metadata.orderId.`);
    return;
  }

  await prisma.$transaction(async (tx) => {
    const { count } = await tx.order.updateMany({
      where: {
        id: orderId,
        stripeSessionId: session.id,
        status: "PENDING"
      },
      data: { status: "CANCELLED" },
    });

    if (count !== 1) return;

    const items = await tx.orderItem.findMany({
      where: { orderId },
      select: { productId: true, quantity: true },
    });

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      });
    }
  });
}