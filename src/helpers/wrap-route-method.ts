import { Request, Response } from 'express'
import { RouteOptions } from '../interfaces'

const mapToObject = (keys, source) =>
  keys.reduce((obj, key) => {
    if (typeof source[key] !== 'undefined') obj[key] = source[key]
    return obj
  }, {})

export const wrapRouteMethod = (fn: (props: any) => Promise<any>, opts: Partial<RouteOptions>) => async (req: Request, res: Response) => {
  const props: any = {}

  if (opts.query && req.query) props.query = mapToObject(opts.query, req.query)
  if (opts.params && req.params) props.params = mapToObject(opts.params, req.params)
  if (opts.body && req.body) props.body = mapToObject(opts.body, req.body)

  const result = await fn(props)
  res.send(result)
}
