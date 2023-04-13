### Rest api with prisma orm

- `Nodejs`
- `Express`
- `Typescript`

#### Routes

- `/login`
- `/register`
- `/secret`: `protected` 

- Protected routes: `{ headers:{ authorization: <Token> }` the token will expire in 10 minutes.

#### Development

- `yarn run watch`
- `yarn run dev`  
- `yarn run format`

### Features

- `@ControllerMethodHandler`: Decorator function to handle/standardize the reponse (controller methods should be `async`).

- `@validateRequest` : Work in progress.

### Database:

Database client postgres with (https://www.prisma.io/)

Under folder database:

- `docker-compose up -d`

Project root: 

- `yarn prisma generate`.
- `yarn prisma migrate dev`.

Update migration schema:

- `prisma migrate dev --name add_description`.
- `prisma migrate reset`.
- `prisma generate`.
