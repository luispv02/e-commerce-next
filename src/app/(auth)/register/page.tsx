import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { redirectIfAuthenticated } from "@/lib/auth-utils";
import { Suspense } from "react";

export default async function RegisterPage() {
  await redirectIfAuthenticated();

  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
