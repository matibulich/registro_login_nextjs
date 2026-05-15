import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/ui/login-form";
import { BASE_URL } from "@/lib/strapi";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (jwt) {
    try {
      const response = await fetch(`${BASE_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (response.ok) {
        redirect("/dashboard");
      }
    } catch (error) {
      console.error("Login redirect validation failed:", error);
    }
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}