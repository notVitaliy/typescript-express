import { RouteOptions, RouterOptions } from '../interfaces'
import { setRouter, wrapRouteMethod } from '../helpers'

export const Get = ({ path, query, params }: RouteOptions) => <T>(target: T & RouterOptions, propName: string) => {
  const wrappedMethod = wrapRouteMethod(target[propName], { query, params })
  setRouter(target, 'get', path, wrappedMethod)
}
