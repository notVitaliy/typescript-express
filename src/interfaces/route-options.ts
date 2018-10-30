export interface RouteOptions<T = any> {
  path: string
  query?: string[]
  params?: string[]
  body?: T
}
