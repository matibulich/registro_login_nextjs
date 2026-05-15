# Registro/Login con Next.js + Strapi

Monorepo con:

- `frontend/`: aplicación **Next.js (App Router)** con pantallas de **login**, **registro** y **dashboard**.
- `backend/`: **Strapi** (con plugin `users-permissions`) exponiendo endpoints de autenticación.

El frontend consume Strapi por HTTP (por defecto `http://127.0.0.1:1337`).

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

- El frontend usa `BASE_URL` hardcodeado en `frontend/lib/strapi.ts` (por defecto `http://127.0.0.1:1337`). Si cambiás el puerto/host del backend, actualizá ese valor.
