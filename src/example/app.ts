import express from 'express'

import { ExpressApp, Get, Post } from '../decorators'
import { BaseApp } from '../base-app'

import { FooRouter } from './routers'

interface PostHeartbeatProps {
  body: {
    foo: string
    bar: {
      foo: string
    }
  }
}

@ExpressApp({
  port: 3333,
  routers: [FooRouter],
  middleware: [express.json],
})
export class App extends BaseApp {
  @Get({ path: '/' })
  getHeartbeat() {
    return { hearbeat: 200 }
  }

  @Post({
    path: '/',
    body: ['foo', 'bar'],
  })
  postHeartbeat(props: PostHeartbeatProps) {
    return props
  }
}
