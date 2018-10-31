# `typescript-express`

A collection of decorators for express.

This is _not_ a typings library/package for `express`. It is an abstraction layer that sits on top of express. The purpose of this package is to provide decorators for rapid type-safe express app development.

_This project is in development. Use at your own risk._

### Instalation

`typescript-express` requires [express](https://github.com/expressjs/express/)

```
yarn add express
yarn add typescript-express
```

Your `tsconfig.json` needs the following flags:

```json
"experimentalDecorators": true
```

## Usage

There are several decorators provided:

### `@ExpressApp`

This will create a server that listens on port 3000.

```typescript
import { ExpressApp, BaseApp } from 'typescript-express'

@ExpressApp({ port: 3000 })
class App extends BaseApp {}

App.listen()
```

#### Middlewares

Middleware can be added at the top level `@ExpressApp`. Currently custom middleware is not supported but a `@Middleware` decorator is in development. In a future release `@Router` will also accept a `middleware` parameter.

```typescript
import express from 'express'
import { ExpressApp, BaseApp } from 'typescript-express'

@ExpressApp({
  port: 3000,
  middleware: [express.json],
})
class App extends BaseApp {}

App.listen()
```

### `@Get`, `@Post`, `@Put`, etc...

Asynchronous methods are automatically resolved when using `async/await` or a `Promise` is returned by the decorated function. Whatever value is returned from a decorated method will be piped into `res.send()`. In a future release returning a `[number, string]` tuple will allow setting custom http status codes.

```typescript
import { ExpressApp, BaseApp, Get } from 'typescript-express'

@ExpressApp({ port: 3000 })
class App extends BaseApp {
  @Get({ path: '/' })
  getRoot() {
    return 'It works!'
  }
}

App.listen()
```

#### Extracting params/query/body properties

```typescript
import { ExpressApp, BaseApp, Get, Post } from 'typescript-express'

interface GetUserProps {
  query: {
    page: number
    limit: number
  }
  params: {
    id: number
  }
}

interface PostUserProps {
  params: {
    id: number
  }
  body: {
    username: string
  }
}

@ExpressApp({ port: 3000 })
class App extends BaseApp {
  @Get({
    path: '/user/:id/friends',
    query: ['page', 'limit'],
    params: ['id'],
  })
  getUser(props: GetUserProps) {
    const { query, params } = props
    return `Got user ${params.id} friends page ${query.page} with limit of ${query.limit}`
  }

  @Post({
    path: '/user/:id',
    params: ['id'],
    body: ['username'],
  })
  async getUser(props: GetUserProps) {
    const { query, body } = props
    const user = {
      id: query.id,
      username: body.username,
    }

    await myDatabase.update(query.id, body.username)
    return { user }
  }
}

App.listen()
```

Sending a `GET` request to: `/user/1337?page=2&limit=9000` would have `props` that look like this:

```typescript
{
  query: {
    page: 2,
    limit: 9000,
  },
  params: {
    id: 1337,
  },
}
```

Sending a `POST` request to `/user/1337` with a `{ "username": "Password is Taco" }` payload would return:

```typescript
{
  id: 1337,
  username: 'Password is Taco',
}
```

_It's generally a bad idea to destructure the props in the function arguments as there is no guarantee that they will exist. This is a current limitation but a solution may be merged in._

### `@Router`

Routers have a similar API to `@ExpressApp`

```typescript
import { ExpressApp, BaseApp, Get, Router, BaseRouter } from 'typescript-express'

@Router('/foo')
class FooRouter extends BaseRouter {
  @Get({ path: '/' })
  getRoot() {
    return 'It works, also!'
  }
}

@ExpressApp({
  port: 3000,
  routers: [FooRouter],
})
class App extends BaseApp {
  @Get({ path: '/' })
  getRoot() {
    return 'It works!'
  }
}

App.listen()
```

### Limitations

Class method decorators cannot currently mutate the signature of a method. This makes it a bit cumbersome to be required to annotate the input parameter of each method with an interface. This will hopefully be solved in the future or at lease a decent workaround is found. For the time being, if you want type saftey within class methods then you need to annotate them properly.

## TODO

- Error handling with an `@Error` or `@Catch` decorator
- Setting custom http status response codes
- `@Router` specific middleware
- Nested `@Router`s
- Custom `@Middleware` decorator
- `@Static` decorator

©️ Vitaliy
