import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()

const router = new Router()

let  middlewares = [async (ctx, next) => {
  console.log(1)
  await next()
  console.log(3)
  ctx.body='test'
}, async ctx => {
  console.log(2)

}]

router.get('/test', ...middlewares)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)