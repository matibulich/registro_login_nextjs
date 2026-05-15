"use client";

import { useActionState } from "react";
import Link from "next/link";

import { actions } from "@/actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormState } from "@/validations/auth";
import { FormError } from "./form-error";

const INITIAL_STATE: FormState = {
  success: false,
  fields: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

export default function RegistroForm() {
  const [formState, formAction] = useActionState(
    actions.auth.registroUsuarioAction,
    INITIAL_STATE,
  );

  console.log(formState);
  return (
    <section className="relative min-h-screen bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/25 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(60rem_60rem_at_10%_10%,rgba(34,211,238,0.35),transparent_60%),radial-gradient(45rem_45rem_at_90%_20%,rgba(99,102,241,0.35),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-14 lg:px-10">
        <Card className="w-full max-w-sm border-white/10 bg-white/5 text-white shadow-lg shadow-black/30 backdrop-blur">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Registro
            </div>
            <CardTitle className="text-balance text-2xl font-semibold tracking-tight">
              Crear cuenta
            </CardTitle>
            <CardDescription className="text-pretty text-white/70">
              Completá tus datos para registrarte.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div
              className={`text-sm ${formState.success ? "text-green-400" : "text-red-400"} mb-4 text-center font-medium`}>              
              {formState.message}
            </div>

            <form action={formAction} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-white/80">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  required
                  className="border-white/10 bg-slate-950/40 text-white placeholder:text-white/40 focus-visible:ring-emerald-300/60"
                  defaultValue={formState.fields?.name}
                />
              </div>
              <FormError message={formState.errors?.name} />

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white/80">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  className="border-white/10 bg-slate-950/40 text-white placeholder:text-white/40 focus-visible:ring-emerald-300/60"
                  defaultValue={formState.fields?.email}
                />
              </div>
              <FormError message={formState.errors?.email} />
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white/80">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="border-white/10 bg-slate-950/40 text-white placeholder:text-white/40 focus-visible:ring-emerald-300/60"
                  defaultValue={formState.fields?.password}
                />
              </div>
              <FormError message={formState.errors?.password} />
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="text-white/80">
                  Repetir contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="border-white/10 bg-slate-950/40 text-white placeholder:text-white/40 focus-visible:ring-emerald-300/60"
                  defaultValue={formState.fields?.confirmPassword}
                />
              </div>
              <FormError message={formState.errors?.confirmPassword} />

              <Button
                type="submit"
                className="w-full rounded-lg bg-emerald-400 font-semibold text-slate-900 shadow-lg shadow-emerald-400/20 transition hover:bg-emerald-300 focus-visible:ring-emerald-300/60 focus-visible:ring-offset-slate-950"
              >
                Registrarme
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center gap-1 text-sm">
            <span className="text-white/70">¿Ya tenés cuenta?</span>
            <Button
              asChild
              variant="link"
              className="h-auto px-1 py-0 font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
            >
              <Link href="/login">Iniciar sesión</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
