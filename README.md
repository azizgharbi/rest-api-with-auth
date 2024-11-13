# Minimalistic Starter with `tsoa` and `express` for Rapid Implementation

This starter project is a minimalistic setup using `Node.js`, `Express`, and `TypeScript`, featuring route protection, Swagger documentation, and a PostgreSQL database configured with Prisma.

## Tech Stack

- **Node.js**
- **Express**
- **TypeScript**

---

## API Routes

### Available Endpoints

- **Public Routes**
  - `GET /api/v1/user`
  - `POST /api/v1/login`
  - `POST /api/v1/register`

- **Protected Route**
  - `GET /api/v1/secret` - Requires an authorization token in headers:
    ```json
    { "headers": { "authorization": "<Token>" } }
    ```
  - Tokens expire after 10 minutes.

---

## Development

Use the following commands for development and formatting:

- **Watch Mode**: `yarn run watch`
- **Run in Development**: `yarn run dev`
- **Format Code**: `yarn run format`

---

## Documentation

API route and validation documentation are generated with `tsoa`:

- **Swagger Documentation**: Accessible at `http://localhost:5000/api-docs`
- **Generate Spec and Routes**: `yarn tsoa spec-and-routes`

---

## Database Setup

The project uses PostgreSQL with Prisma as the ORM. Follow these steps to set up and manage your database.

### 1. Start Database with Docker

In the `database` directory, run:

```bash
docker-compose up -d
