import { LoginForm } from "@/features/auth/components/LoginForm";
import { redirectIfAuthenticated } from "@/lib/auth-utils";
import { Suspense } from "react";

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
