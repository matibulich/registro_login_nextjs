import { Suspense } from "react";
import LoginForm from "@/components/ui/login-form";
import { LoginRedirectGate } from "./redirect-gate";

export default async function LoginPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <LoginRedirectGate />
      </Suspense>
      <LoginForm />
    </div>
  );
}
