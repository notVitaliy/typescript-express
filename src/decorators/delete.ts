import { RouterOptions, RouteOptions } from '../interfaces'
import { setRouter, wrapRouteMethod } from '../helpers'

export const Delete = ({ path, query, params }: RouteOptions) => <T>(target: T & RouterOptions, propName: string) => {
  const wrappedMethod = wrapRouteMethod(target[propName], { query, params })
  setRouter(target, 'delete', path, wrappedMethod)
}
