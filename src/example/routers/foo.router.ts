import { BaseRouter } from '../../base-router'
import { Get, Router } from '../../decorators'

interface FooBarProps {
  query: {
    page: number
  }
}

interface FooSubPathProps {
  params: {
    subPath: string
  }
}

@Router('/foo')
export class FooRouter extends BaseRouter {
  @Get({
    path: '/bar',
    query: ['page'],
  })
  getBar(props: FooBarProps) {
    return `Send this to client: getBar() -> ${props.query.page}`
  }

  @Get({
    path: '/:subPath',
    params: ['subPath'],
  })
  getRandom(props: FooSubPathProps) {
    return `Send this to client: getRandom() -> ${props.params.subPath}`
  }
}
