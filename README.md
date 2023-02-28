### API REST ( Minimalism starter without database client)

- `Nodejs`
- `Express`
- `Typescript`

#### Routes

- `/login`
- `/register`
- `/secret`: `protected` 

- Protected routes: `{ headers:{ authorization: <Token> }` the token will expire in 10 minutes.

#### Nice to have

- Database client.
- docker container.
- Validation and logging (work in progress).
- cdk to deploy for aws.

#### Development

- `yarn run watch`
- `yarn run dev`  
- `yarn run format`

### Feature

- `@ControllerMethodHandler`: Decorator function to handle/standardize the reponse (controller methods should be `async`).

- `@validateRequest` : Work in progress.