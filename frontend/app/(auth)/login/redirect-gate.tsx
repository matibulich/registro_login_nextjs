import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NEXT_PUBLIC_STRAPI_URL } from "@/lib/strapi";

export async function LoginRedirectGate() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) return null;

  try {
    const response = await fetch(`${NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
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

  return null;
}
