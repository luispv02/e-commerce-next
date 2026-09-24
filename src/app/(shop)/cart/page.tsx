import { LoginRequired } from "@/features/auth/components/LoginRequired";
import { CartContent } from "@/features/cart/components/CartContent";
import { getCartService } from "@/features/cart/services/cart.service";
import { getSession } from "@/lib/auth-utils";

export default async function CartPage() {

  const session = await getSession();

  if (!session?.user) {
    return (
      <LoginRequired
        message="Necesitas iniciar sesión para ver los productos de tu carrito"
        returnTo="/cart"
      />
    );
  }

  const cart = await getCartService(session.user.id);

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl">
        <CartContent cart={cart} />
      </div>
    </section>
  );
}
