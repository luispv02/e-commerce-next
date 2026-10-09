import { LoginForm } from "@/features/auth/components/LoginForm";
import { redirectIfAuthenticated } from "@/lib/auth-utils";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Inicia sesión para gestionar tus compras y tu cuenta.",
};

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
