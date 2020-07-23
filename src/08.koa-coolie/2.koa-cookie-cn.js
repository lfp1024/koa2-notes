const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
const path = require('path')

const app = new Koa()
const router = new Router({ prefix: '/cookie' })

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
})

router.get('/', async (ctx) => {
  // 设置Cookie
  // 在响应报文中通过 Set-Cookie 字段传递给客户端

  // 无法直接设置中文cookie（报错），需要转换为 base64 编码格式
  const username = Buffer.from('打篮球', 'utf-8').toString('base64')

  ctx.cookies.set('hobby', username, {
    maxAge: 60 * 1000 * 60 * 24
  })
  await ctx.render('index')
})

router.get('/news', async (ctx) => {
  // 可以获取Cookie
  // 在请求报文中携带 Cookie 字段
  const data = ctx.cookies.get('hobby')

  // 将base64字符串转换为中文
  const cookie = Buffer.from(data, 'base64').toString()

  ctx.render('news', {
    cookie
  })
})

app
  .use(router.routes())
  .listen(3000, () => { console.log('listening on port 3000') })
