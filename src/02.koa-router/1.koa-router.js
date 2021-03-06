// Koa类，大写
const Koa = require('koa')
const Router = require('koa-router')

// 实例化
const app = new Koa()
// prefix 添加URL前缀
const router = new Router({ prefix: '/test' })

// 配置路由
// 首页
// URL http://localhost:3000/test（后面默认有个 / 斜杠）
router.get('/', (ctx) => {
  ctx.body = 'this is homepage'
})

// URL http://localhost:3000/test/news
// router.get 返回值仍然是一个router，可以链式调用
router
  .get('/news', (ctx) => {
    ctx.body = 'hi, news'
  })
  .get('/newsList', (ctx) => {
    ctx.body = 'new list'
  })

// GET传值和获取
// URL http://localhost:3000/test/content?age=27&name=lfp
router.get('/content', (ctx) => {
  const { header, headers, method, url, origin, originalUrl, href, path, query, querystring, host, hostname, fresh, stale, socket, protocol, secure, ip, ips, subdomains} = ctx
  console.log(ctx.is(),ctx.accepts('json'),ctx.acceptsEncodings(),ctx.acceptsCharsets(),ctx.acceptsLanguages(),ctx.get('content-type'));
  // 从request对象中获取GET请求
  const { request } = ctx
  const reqQuery = request.query
  const reqQuerystring = request.querystring
  // 从ctx上下文中获取GET请求
  const ctxQuery = ctx.query
  const ctxQuerystring = ctx.querystring

  // ctx.body = {
  //   request,
  //   url,
  //   host, hostname,
  //   reqQuery,
  //   reqQuerystring,
  //   ctxQuery,
  //   ctxQuerystring
  // }
  let log = {
    header, headers, method, url, origin, originalUrl, href, path, query, querystring, host, hostname, fresh, stale, socket, protocol, secure, ip, ips, subdomains
  }
  console.log(log);
})

// 动态路由
// URL http://localhost:3000/test/product/123/456
router.get('/product/:aid/:cid', (ctx) => {
  // 通过 ctx.params 获取动态路由数据
  const { aid } = ctx.params
  const { cid } = ctx.params
  console.log('aid is =', aid)
  console.log('cid is =', cid)
  ctx.body = 'product page'
})

app
  .use(router.routes()) // 用来启动路由
  .use(router.allowedMethods()) // 当请求出错时的处理逻辑
  .listen(3000, () => { console.log('listening on port 3000') }) // 监听端口
