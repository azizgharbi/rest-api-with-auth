### Minimalistic starter using `tsoa` and `express` (Rapid Implementation)

- `Nodejs`
- `Express`
- `Typescript`

#### Routes

- `/api/v1/user`
- `/api/v1/login`
- `/api/v1/register`
- `/api/v1/secret`: `protected`

- Protected routes: `{ headers:{ authorization: <Token> }` the token will expire in 10 minutes.

#### Development:

- `yarn run watch`
- `yarn run dev`
- `yarn run format`

### Routes and validations docs is using `tsoa`

- Swagger : `http://localhost:5000/api-docs`
- `yarn tsoa spec-and-routes`

### Database:

Database client Postgres with (https://www.prisma.io/)

Under folder database:

- `docker-compose up -d`

Project root:

- `yarn prisma generate`.
- `yarn prisma migrate dev`.

Update migration schema:

- `prisma migrate dev --name add_description`.
- `prisma migrate reset`.
- `prisma generate`.
