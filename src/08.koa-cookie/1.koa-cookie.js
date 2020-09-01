const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
const path = require('path')

const CookieDateEpoch = 'Thu, 01 Jan 1970 00:00:00 GMT'
const COOKIE_EXP_DATE = new Date(CookieDateEpoch)

const app = new Koa()
const router = new Router({ prefix: '/cookie' })

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
})

router.get('/', async (ctx) => {
  // 设置Cookie
  // 在响应报文中通过 Set-Cookie 字段传递给客户端
  ctx.cookies.set('username', 'lfp', {
    maxAge: 60 * 1000 * 60 * 24,
    // maxAge: -1,
    // expires: new Date(2020, 6, 2), // 同时存在，则maxAge优先级高，里面会重新赋值

    // 最终没有 maxAge 字段，只有expires字段
    // 将值转换为数字计算
    // if (this.maxAge) this.expires = new Date(Date.now() + this.maxAge);

    // true == 1, 条件成立，expires = Date.now() + 1，立即过期
    // 负数        条件成立，expires = Date.now() + 负数，立即过期
    // 正数（毫秒）  条件成立，expires = Date.now() + 正数，指定时间后过期（1000ms闪一下便过期消失）
    // false 0 '' null NaN undefined, 条件不成立，expires = undefined => session cookie
    // 非空字符串，  条件成立，但是 new Date() 返回 Invalid Date，expires = Invalid Date => session cookie

    // path: '/cookie/news', // 只有路径匹配才能
    // domain:'.baidu.com' // 此时 只有访问百度相关的网站，baike.baidu.com tieba.baidu.com 才可以携带Cookie
    httpOnly: false // 在客户端可以通过 JS代码访问

  })
  await ctx.render('index')
  console.log('11')

  ctx.body = '设置cookie'
})

router.get('/shop', async (ctx) => {
  // 无法获取Cookie
  // 在请求报文中没有 Cookie 字段
  const cookie = ctx.cookies.get('username')
  console.log('cookie = ', cookie)
  ctx.body = cookie || 'cookie is'
})

router.get('/news', async (ctx) => {
  // 可以获取Cookie
  // 在请求报文中携带 Cookie 字段
  const cookie = ctx.cookies.get('username')

  ctx.render('news', {
    cookie
  })
})

router.get('/news/info', async (ctx) => {
  // 可以获取Cookie
  // 在请求报文中携带 Cookie 字段
  const cookie = ctx.cookies.get('username')

  ctx.body = `cookie is ${cookie}`
})

app
  .use(router.routes())
  .listen(3000, () => { console.log('listening on port 3000') })
