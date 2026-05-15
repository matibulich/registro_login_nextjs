"use server"

import { RegisterUserService, LoginUserService } from "@/lib/strapi";
import { FormState, loginSchema, registroSchema, RegistroData } from "@/validations/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const configCookie = {
  maxAge: 60 * 60 * 24 * 7, // 7 días
  httpOnly: true, // Solo accesible por el servidor
  secure: process.env.NODE_ENV === "production", // Solo en producción
  path: "/",
  domain: process.env.NODE_ENV === "production" ? process.env.HOST : undefined,
};

export async function registroUsuarioAction(
  prevState: FormState,
  formData: FormData | Record<string, unknown>,
): Promise<FormState> {
  console.log("registroUsuarioAction received formData:", formData);

  const getFieldValue = (key: string) => {
    if (formData instanceof FormData) {
      return formData.get(key);
    }

    return formData?.[key] ?? null;
  };

  const fields: RegistroData = {
    name: (getFieldValue("name") as string) ?? "",
    email: (getFieldValue("email") as string) ?? "",
    password: (getFieldValue("password") as string) ?? "",
    confirmPassword: (getFieldValue("confirmPassword") as string) ?? "",
  };

  const validateFields = registroSchema.safeParse(fields);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Datos inválidos",
      fields,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  let response;
  try {
    response = await RegisterUserService({
      username: validateFields.data.email,
      email: validateFields.data.email,
      password: validateFields.data.password,
    });
  } catch (error) {
    console.error("Registration error caught in action:", error);
    return {
      success: false,
      message: "Error al registrar el usuario",
      fields,
    };
  }

  if (!response || response.error) {
    const errorData = response?.error;
    console.log("Error data:", errorData);
    const errors: FormState["errors"] = {};

    const message = (errorData?.message as string)?.toLowerCase() ?? "";
    if (message.includes("email") || message.includes("already taken")) {
      errors.email = ["El email ya existe"];
    } else if (message.includes("username")) {
      errors.email = ["El nombre de usuario ya existe"];
    } else {
      errors.email = [errorData?.message ?? "Error desconocido"];
    }

    return {
      success: false,
      message: "Error al registrar el usuario",
      fields,
      errors,
    };
  }

  console.log("registro exitoso");

  const cookieStore = await cookies();
  const jwt = response?.data?.jwt;

  if (!jwt) {
    return {
      success: false,
      message: "Error al registrar el usuario",
      fields,
    };
  }

  cookieStore.set("jwt", jwt, configCookie);

  redirect("/dashboard");
}

export async function loginUsuarioAction(
  prevState: FormState,
  formData: FormData | Record<string, unknown>,
): Promise<FormState> {
  console.log("loginUsuarioAction received formData:", formData);

  const getFieldValue = (key: string) => {
    if (formData instanceof FormData) {
      return formData.get(key);
    }

    return formData?.[key] ?? null;
  };

  const fields = {
    email: (getFieldValue("email") as string) ?? "",
    password: (getFieldValue("password") as string) ?? "",
  };

  const validateFields = loginSchema.safeParse(fields);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Datos inválidos",
      fields,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  let response;
  try {
    response = await LoginUserService({
      identifier: validateFields.data.email,
      password: validateFields.data.password,
    });
  } catch (error) {
    console.error("Login error caught in action:", error);
    return {
      success: false,
      message: "Error al iniciar sesión",
      fields,
    };
  }

  const jwt = response?.jwt ?? response?.data?.jwt;
  if (!jwt) {
    return {
      success: false,
      message: "Credenciales inválidas",
      fields,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", jwt, configCookie);

  redirect("/dashboard");
}

