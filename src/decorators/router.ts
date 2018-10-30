import { Router as ExpressRouter } from 'express'
import { RouterOptions } from '../interfaces/router-options'

export const Router = (path: string) => <T extends { new (...args: any[]): {} }>(constructor: T & RouterOptions) => {
  const router = ExpressRouter({ mergeParams: true })
  constructor.path = path
  constructor.router = router
  constructor.prototype.router = router
}
