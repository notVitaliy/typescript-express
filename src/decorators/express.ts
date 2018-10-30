import express from 'express'
import { BaseRouter } from '../base-router'

interface ExpressAppOptions {
  port: number
  routers: typeof BaseRouter[]
}

export const ExpressApp = ({ routers, port }: ExpressAppOptions) => <T extends { new (...args: any[]): {} }>(
  constructor: T & {
    listen?: () => Promise<void>
  }
) => {
  const app = express()
  routers.forEach((router) => app.use(router.path, router.router))

  constructor.prototype.listen = () => new Promise<void>((resolve) => app.listen(port, () => resolve()))
}
