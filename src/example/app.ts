import { ExpressApp } from '../decorators'
import { BaseApp } from '../base-app'

import { FooRouter } from './routers'

@ExpressApp({
  port: 3333,
  routers: [FooRouter],
})
export class App extends BaseApp {}
