
import { LoginRequired } from "@/features/auth/components/LoginRequired";
import { EmptyCart } from "@/features/cart/components/EmptyCart";
import { getCartService } from "@/features/cart/services/cart.service";
import { CheckoutView } from "@/features/checkout/components/CheckoutView";
import { getSession } from "@/lib/auth-utils";

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    return (
      <LoginRequired
        message="Necesitas iniciar sesión para realizar tu compra."
        returnTo="/checkout"
      />
    );
  }

  const cart = await getCartService(session.user.id);
  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }


  return <CheckoutView cart={cart} />;
}
