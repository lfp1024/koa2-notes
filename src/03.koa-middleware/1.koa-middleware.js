const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router({ prefix: '/mw' })

// 应用级中间件
// path：表示匹配某个路由的中间件，如果缺省，则匹配所有访问请求（即使没有path对应的路由，也会匹配到）
// callback：表示中间件需要执行的动作
app.use(async (ctx, next) => {
  console.log(new Date())
  // 如果不加next则匹配任何路径，下面的路由则不再匹配
  // 加 next 则继续匹配下面的路由中间件
  await next()
  // 错误处理中间件
  if (ctx.status === 404) {
    ctx.status = 404
    ctx.body = 'this is 404 page'
  } else {
    console.log(ctx.url)
  }
})

// 路由中间件
router
  .get('/', (ctx) => {
    ctx.body = 'this is homepage'
  })
  .get('/news', async (ctx, next) => {
    // do something
    console.log('控制台打印日志')
    // 继续匹配下一个路由
    await next()
  })
  .get('/news', async (ctx) => {
    ctx.body = 'this is news page'
  })

app
  .use(router.routes())
  .listen(3000, () => { console.log('listening on prot 3000') })
