
import { LoginRequired } from "@/features/auth/components/LoginRequired";
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


  return <CheckoutView />;
}
