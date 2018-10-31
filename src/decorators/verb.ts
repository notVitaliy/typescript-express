import { RouterOptions, RouteOptions } from '../interfaces'
import { setRouter, wrapRouteMethod } from '../helpers'

const Verb = (verb: string) => ({ path, query, params, body }: RouteOptions) => <T>(target: T & RouterOptions, propName: string) => {
  const wrappedMethod = wrapRouteMethod(target[propName], { query, params, body })
  setRouter(target, verb, path, wrappedMethod)
}

// Common
export const Get = Verb('get')
export const Post = Verb('post')
export const Put = Verb('put')
export const Delete = Verb('delete')
export const Head = Verb('head')
export const Options = Verb('options')
export const Patch = Verb('patch')

// Uncommon
export const Checkout = Verb('checkout')
export const Copy = Verb('copy')
export const Lock = Verb('lock')
export const Merge = Verb('merge')
export const Mkactivity = Verb('mkactivity')
export const Mkcol = Verb('mkcol')
export const Move = Verb('move')
export const MSearch = Verb('m-search')
export const Notify = Verb('notify')
export const Purge = Verb('purge')
export const Report = Verb('report')
export const Search = Verb('search')
export const Subscribe = Verb('subscribe')
export const Trace = Verb('trace')
export const Unlock = Verb('unlock')
export const Unsubscribe = Verb('unsubscribe')
