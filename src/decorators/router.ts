import { Router as ExpressRouter } from 'express'
import { RouterOptions } from '../interfaces'

export const Router = (path: string) => <T extends { new (...args: any[]): {} }>(constructor: T & RouterOptions) => {
  constructor.path = path
  constructor.prototype.router = constructor.router = ExpressRouter({ mergeParams: true })
}
