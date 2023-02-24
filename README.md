### API REST (starter without database client)

- Nodejs
- Express
- Typescript

#### Routes

`/login`: [Post]
`/register`: [Post]
`/secret`: `protected` [Get] 

- Protected routes: `{ headers:{ authorization: <Token> }` the token will expire in 10 minutes.

#### Nice to have

- Add database client
- Integrate docker
- There is already
- Add middleware authentification

#### Development

- `yarn run watch`
- `yarn run dev`  