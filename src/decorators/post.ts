import { RouterOptions, RouteOptions } from '../interfaces'
import { setRouter, wrapRouteMethod } from '../helpers'

export const Post = ({ path, query, params, body }: RouteOptions) => <T>(target: T & RouterOptions, propName: string) => {
  const wrappedMethod = wrapRouteMethod(target[propName], { query, params, body })
  setRouter(target, 'post', path, wrappedMethod)
}
