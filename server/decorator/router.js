import {resolve} from 'path'
import Router from 'koa-router'
import glob from 'glob'
import {defaultLogger} from "../../config/logger";
import {
  is,
  of,
  unless,
  curryN,
  concat,
  compose,
  startsWith
} from 'ramda'

const symbolPath = Symbol('pathPrefix')
const routeMap = new Map()

export const change2Array = unless(
  is(Array),
  of
)

export class Route {
  constructor(app, routesPath) {
    this.app = app;
    this.router = new Router();
    this.routesPath = routesPath;
  }

  init = () => {
    const {app, router, routesPath} = this;
    glob.sync(resolve(routesPath, './*.js')).forEach(require)
    for (let [conf, controller] of routeMap) {
      const {target, method, path} = conf
      const controllers = change2Array(controller);
      let prefixPath = target[symbolPath]
      if (prefixPath) prefixPath = normalizePath(prefixPath);
      const routerPath = prefixPath + path;
      this.router[method](routerPath, ...controllers);
    }
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

export const normalizePath = unless(
  startsWith('/'),
  curryN(2, concat)('/')
)

export const setRouter = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path)
  routeMap.set({
    target,
    ...conf,
  }, target[key])
  return descriptor
}
export const convert = middleware => (target, key, descriptor) => {
  target[key] = compose(
    concat(
      change2Array(middleware)
    ),
    change2Array
  )(target[key])
  return descriptor
}
export const Log = convert(async function log(ctx, next) {
  let data = ''
  switch (ctx.method) {
    case 'GET':
      data = ctx.query || ''
      break;
    case 'POST':
      data= ctx.request.body || ''
      break
  }
  defaultLogger.info(`${ctx.method}  -  ${ctx.url} -  ${JSON.stringify(data)}`)
  await next()
})


export const Controller = path => target => (target.prototype[symbolPath] = path)

export const Get = path => setRouter({
  method: 'get',
  path
})

export const Post = path => setRouter({
  method: 'post',
  path
})

export const Put = path => setRouter({
  method: 'put',
  path
})

export const Delete = path => setRouter({
  method: 'delete',
  path
})


