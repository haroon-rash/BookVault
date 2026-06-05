<<<<<<< HEAD
# BookVault — Book Management System

A full-stack book store and admin dashboard built with Next.js. Public users can browse, search, and add books to a cart without logging in. Admins manage inventory through a protected dashboard.

## Features

### Public store
- Browse books on the home page
- Search by title or author
- View book details (`/books/[id]`)
- Shopping cart with localStorage persistence

### Admin dashboard
- Secure login (NextAuth credentials)
- Add, edit, and delete books
- Inventory stats (total books, stock, average price)

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL + Prisma |
| Auth | NextAuth.js (credentials) |
| Validation | Zod |
| Styling | Tailwind CSS 4 |

## Prerequisites

- Node.js 20+
- PostgreSQL running locally (or a remote connection string)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and update values as needed:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Session secret — generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | App URL (use `http://localhost:3000` locally) |
| `ADMIN_USERNAME` | Default admin username for seed |
| `ADMIN_PASSWORD` | Default admin password for seed |

### 3. Set up the database

```bash
npm run db:migrate
npm run db:seed
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the store.

Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Default credentials (from `.env.example`): **admin** / **admin123**

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (webpack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Apply Prisma migrations |
| `npm run db:seed` | Create or update the admin user |
| `npm run db:studio` | Open Prisma Studio |

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Book catalog + search |
| `/books/[id]` | Public | Book detail page |
| `/cart` | Public | Shopping cart |
| `/admin/login` | Public | Admin login |
| `/admin` | Admin only | Dashboard (CRUD + stats) |

## Project structure

```
app/
  (store)/          Public store pages
  admin/            Admin dashboard + login
  api/auth/         NextAuth API route

components/
  admin/            Dashboard UI
  auth/             Login form
  cart/             Cart UI
  store/            Catalog UI
  ui/               Shared design system

actions/            Server actions (book CRUD)
hooks/              Client form logic
lib/
  auth/             NextAuth config + session guards
  errors/           Typed errors + action wrappers
  validations/      Zod schemas
providers/          Cart context
prisma/             Schema, migrations, seed
types/              Shared TypeScript types
middleware.ts       Protects /admin routes
```

## Book model

Each book has: `title`, `author`, `description`, `price`, `quantity`, `imageUrl`.

Author names must contain at least one letter (numbers-only names are rejected).

## Error handling

Server actions return a typed `ActionResult` with consistent codes and HTTP-style status:

| Code | Status | When |
|------|--------|------|
| `VALIDATION_ERROR` | 400 | Invalid input (Zod) |
| `UNAUTHORIZED` | 401 | Not signed in |
| `FORBIDDEN` | 403 | Signed in but not admin |
| `NOT_FOUND` | 404 | Book or record missing |
| `DATABASE_ERROR` | 500 | Prisma / DB failure |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

- Mutations use `executeAction()` — errors are caught, logged, and returned safely.
- Reads use `executeQuery()` — failures log a warning/error and return a safe fallback.
- Admin session expiry redirects to `/admin/login` automatically from forms.

## Notes

- Cart data is stored in the browser (`localStorage`) — no checkout or payment flow.
- The dev server uses `--webpack` for stability with this Next.js version.
- Change `NEXTAUTH_SECRET` and admin credentials before deploying to production.
=======
# BookVault
>>>>>>> 39f6f202bef9dd170de54f5999dfd5a4a88ec4f5
