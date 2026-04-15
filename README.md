# Minimalistic Starter with `tsoa` and `express` for Rapid Implementation

This starter project is a minimalistic setup using `Node.js`, `Express`, and `TypeScript`, featuring route protection, Swagger documentation, and a PostgreSQL database configured with Prisma.

## Tech Stack

- **Bun**
- **Express**
- **TypeScript**

---

## API Routes

### Available Endpoints

- **Public Routes**
  - `GET /api/v1/user`
  - `POST /api/v1/user/register`
  - `POST /api/v1/user/login`

- **Protected Route**
  - `GET /api/v1/user/secret` - Requires an authorization token in headers:
    ```json
    { "headers": { "authorization": "Bearer <token>" } }
    ```
  - Tokens expire after 10 minutes.

---

## Development

Use the following commands for development and formatting:

- **Install dependencies**: `bun install`
- **Watch Mode**: `bun run watch`
- **Run in Development**: `bun run dev`
- **Generate Prisma Client**: `bun run prisma:generate`

---

## Documentation

API route and validation documentation are generated with `tsoa`:

- **Swagger Documentation**: Accessible at `http://localhost:5000/api-docs`
- **Generate Spec and Routes**: `bun run tsoa spec-and-routes`

---

## Environment

Copy `.env.example` to `.env` and update the values before starting the app.

## Database Setup

The project uses PostgreSQL with Prisma as the ORM. Follow these steps to set up and manage your database.

### 1. Start Database with Docker

In the `database` directory, run:

```bash
docker-compose up -d
```
