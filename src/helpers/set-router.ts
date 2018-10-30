import { Request, Response } from 'express'

export const setRouter = (target: any, method: string, path: string, fn: (req: Request, res: Response) => void) => {
  // hackkitty hack hack...
  // Class decorators are run _after_ method decorators
  // since the class decorator adds router to the prototype,
  // we need to wait for that to run first.
  setTimeout(() => target.router[method](path, fn), 20)
}
