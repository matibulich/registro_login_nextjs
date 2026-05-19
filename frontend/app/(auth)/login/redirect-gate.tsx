import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NEXT_PUBLIC_STRAPI_URL } from "@/lib/strapi";

export async function LoginRedirectGate() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) return null;

  let response;

  try {
    response = await fetch(`${NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
  } catch (error) {
    console.error("Login validation failed:", error);
    return null;
  }

  if (response.ok) {
    redirect("/dashboard");
  }

  return null;
}
