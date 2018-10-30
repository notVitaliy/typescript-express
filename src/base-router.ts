import { Router } from 'express'

export abstract class BaseRouter {
  public static path: string
  public static router: Router
}
