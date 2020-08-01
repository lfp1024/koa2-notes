const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router({ prefix: '/cross' })

app.use((ctx, next) => {
  const req = ctx.request
  const res = ctx.response
  console.log('res = ', res, ' req = ', req)

  const whiteList = ['http://localhost:5500', 'http://localhost:3001']
  const reqOrigin = req.header.origin
  console.log('req origin:', reqOrigin)
  let allowOrigin = '*'
  // localhost !== 127.0.0.1
  if (whiteList.includes(reqOrigin)) {
    allowOrigin = reqOrigin
    console.log('white list origin:', reqOrigin)
  }

  res.set('Access-Control-Allow-Origin', allowOrigin)
  res.set('Access-Control-Allow-Methods', 'DELETE,GET,HEAD,POST,OPTIONS,TRACE')
  res.set('Access-Control-Allow-Credentials', 'true')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') res.send('SUPPORT CROSS-DOMAIN')
  else next()
})

router.get('/list', (ctx) => {
  ctx.body = 'hi, you get it'
})

app
  .use(router.routes())
  .listen(3000, () => { console.log('listening on port 3000') })
