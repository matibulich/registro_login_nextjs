import Link from "next/link";
import { NEXT_PUBLIC_STRAPI_URL } from "@/lib/strapi";

type HeroSectionData = {
  Header?: string;
  Sub_header?: string;
  enlace?: { href?: string; label?: string } | null;
  Image_hero?: { url?: string } | null;
};

function resolveStrapiMediaUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export function HeroSection({ data }: { readonly data: HeroSectionData | null }) {
  if (!data) return null;

  const { Header, Sub_header, enlace, Image_hero } = data;
  const heroHref = enlace?.href ?? "#";
  const heroLabel = enlace?.label ?? "Ver más";
  const heroImageUrl = resolveStrapiMediaUrl(Image_hero?.url);

  return (
    <section className="relative min-h-screen bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/25 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(60rem_60rem_at_10%_10%,rgba(34,211,238,0.35),transparent_60%),radial-gradient(45rem_45rem_at_90%_20%,rgba(99,102,241,0.35),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-14 lg:px-10">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {Header ?? "Bienvenido"}
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Inicia sesión y continúa{" "}
            <span className="text-emerald-300">aprendiendo</span>.
          </h1>

          <p className="mx-auto max-w-xl text-pretty text-base text-white/70 sm:text-lg">
            {Sub_header ?? "Accede a tu cuenta o crea una nueva para empezar."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/20 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              {heroLabel}
            </Link>
            <a
              href="/registro"
              className="text-sm font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
            >
              Crear cuenta
            </a>
          </div>

          {heroImageUrl ? (
            <div className="mx-auto hidden max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur lg:block">
              <img
                src={heroImageUrl}
                alt="Hero image"
                className="h-56 w-full rounded-xl object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
