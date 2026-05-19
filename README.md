# Registro/Login con Next.js + Strapi

Monorepo con:

- `frontend/`: aplicación **Next.js (App Router)** con pantallas de **login**, **registro** y **dashboard**.
- `backend/`: **Strapi** (con plugin `users-permissions`) exponiendo endpoints de autenticación.

El frontend consume Strapi por HTTP (por defecto `http://127.0.0.1:1337`).

## Sitio

- https://registro-login-nextjs.vercel.app

## Estructura

- `backend/` (Strapi)
  - Configuración y API en `backend/src/`
  - Ejemplo de variables de entorno en `backend/.env.example`
- `frontend/` (Next.js)
  - Rutas en `frontend/app/`:
    - `/(auth)/login`
    - `/(auth)/registro`
    - `/dashboard`
  - Cliente Strapi en `frontend/lib/strapi.ts`

## Requisitos

- Node.js `>= 20`
- Recomendado: `pnpm` (hay `pnpm-lock.yaml` en ambos proyectos)

## Instalación

### Backend (Strapi)

```bash
cd backend
pnpm install
copy .env.example .env
pnpm develop
```

Por defecto levanta en `http://localhost:1337`.

### Frontend (Next.js)

```bash
cd frontend
pnpm install
pnpm dev
```

Por defecto levanta en `http://localhost:3000`.

## Variables de entorno (frontend)

### `NEXT_PUBLIC_STRAPI_URL`

URL base del backend de Strapi que consume el frontend (debe incluir protocolo), por ejemplo:

- `http://127.0.0.1:1337` (desarrollo local)
- `https://<tu-backend-strapi>` (producción)

Si no está definida, el frontend usa `http://127.0.0.1:1337` como fallback.

> Nota: Al tener el prefijo `NEXT_PUBLIC_`, Next.js la expone al código que corre en el navegador.

## Variables de entorno (backend)

Copiá `backend/.env.example` a `backend/.env` y completá:

- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `ENCRYPTION_KEY`

## Endpoints de auth (Strapi)

Strapi expone (por defecto):

- `POST /api/auth/local/register` (registro)
- `POST /api/auth/local` (login)

## Notas

- El frontend toma el base URL de Strapi desde `NEXT_PUBLIC_STRAPI_URL` (ver arriba).
