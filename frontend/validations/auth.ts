import zod from "zod";

export const loginSchema = zod.object({
     email: zod.email({message: "Email inválido"}),    
    password: zod.string().min(6, "Minimo 6 caracteres").max(30, "Maximo 20 caracteres"),
});

export const registroSchema = zod.object({
    name: zod.string()
        .min(2, "Minimo 2 caracteres")
        .max(50, "Maximo 50 caracteres"),

    email: zod.email({
        message: "Email inválido"
    }),

    password: zod.string()
        .min(6, "El password debe tener minimo 6 caracteres")
        .max(30, "Maximo 20 caracteres"),

    confirmPassword: zod.string()
        

}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    }
);

export type LoginData = zod.infer<typeof loginSchema>;
export type RegistroData = zod.infer<typeof registroSchema>;

export type FormState = {
  success?: boolean;
  message?: string;

  fields?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
}