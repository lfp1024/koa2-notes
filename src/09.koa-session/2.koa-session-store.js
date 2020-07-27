const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const session = require('koa-session')
const debug = require('debug')('lfp-koa-session')
const fs = require('fs')

const app = new Koa()
const router = new Router({ prefix: '/session' })

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
})

app.keys = ['some secret info'] // 生成cookie的签名密钥

const store = {
  get(key) {
    const sessionDir = path.resolve(__dirname, './session')
    const files = fs.readdirSync(sessionDir)

    for (let i = 0; i < files.length; i += 1) {
      if (files[i].startsWith(key)) {
        const filePath = path.resolve(sessionDir, files[i])
        delete require.cache[require.resolve(filePath)]
        // eslint-disable-next-line import/no-dynamic-require
        const result = require(filePath)
        return result
      }
    }
  },
  // eslint-disable-next-line no-shadow
  set(key, session) {
    const filePath = path.resolve(__dirname, './session', `${key}.js`)
    const content = `module.exports = ${JSON.stringify(session)};`

    fs.writeFileSync(filePath, content)
  },

  destroy(key) {
    const filePath = path.resolve(__dirname, './session', `${key}.js`)
    fs.unlinkSync(filePath)
  }
}

// session默认会产生一个cookie，该cookie当浏览器关闭的时候过期
// 每次访问都会产生一个新的cookie，但是session过期
const sessionConfig = {
  key: 'koa.sess', // 给客户端返回cookie的 key，默认即可
  maxAge: 5000, // session的过期时间，默认1天，【需要配置】
  // autoCommit: true,   // (boolean) automatically commit headers (default true)
  overwrite: true, // 设置是否覆盖同名cookie，默认即可
  httpOnly: true, // 设置是否只通过请求发送cookie，默认即可
  signed: true, // 是否对cookie进行签名，默认即可
  rolling: false, // 每次响应时刷新session的有效期，重置过期时间和失效倒计时，默认即可
  renew: false, // 当session快过期时刷新session的有效期（重置过期时间和失效倒计时），【一般设置为true】
  secure: false, // (boolean) secure cookie ，如果为true只能通过HTTPS协议访问
  sameSite: null, // (string) session cookie sameSite options (default null, don't set it)
  store
}
// 配置中间件
app.use(session(sessionConfig, app))

/*
当前的代码，每次访问 visits 不同，都会创建一个新的session。且保存在cookie中
*/

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') return
  debug('code call session -----------------')
  let n = ctx.session.visits || 0
  debug('code second call session -------------')
  n += 1
  ctx.session.visits = n

  ctx.session.maxAge = 6666

  await next()
})

router.get('/login', async (ctx) => {
  // 设置session
  ctx.session.username = '尼古拉斯赵四'

  ctx.render('login')
})

app
  .use(router.routes())
  .listen(3000, () => { debug('listening on port 3000') })
