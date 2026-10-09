import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { redirectIfAuthenticated } from "@/lib/auth-utils";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: "Crea una cuenta para realizar y consultar tus compras.",
};

export default async function RegisterPage() {
  await redirectIfAuthenticated();

  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
