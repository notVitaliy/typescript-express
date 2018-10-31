import express, { Express, Handler } from 'express'
import { BaseRouter } from '../base-router'

interface ExpressAppOptions {
  port: number
  routers?: typeof BaseRouter[]
  middleware?: ((...args: any[]) => Handler)[]
}

export const ExpressApp = ({ port, routers, middleware }: ExpressAppOptions) => <T extends { new (...args: any[]): {} }>(
  constructor: T & {
    listen?: () => Promise<void>
    router?: Express
  }
) => {
  const app = (constructor.prototype.router = express())

  if (middleware && Array.isArray(middleware)) middleware.forEach((middle) => app.use(middle()))
  if (routers && Array.isArray(routers)) routers.forEach(({ path, router }) => app.use(path, router))

  constructor.listen = () => new Promise<void>((resolve) => app.listen(port, () => resolve()))
}
