const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')

const app = new Koa()
const router = new Router({ prefix: '/cross' })

app.use(cors({
  origin: (ctx) => {
    const whitelist = ['http://127.0.0.1:5500', 'http://192.168.200.2:3001']
    const reqOrigin = ctx.request.header.origin
    console.log('req origin:', reqOrigin)
    let allowOrigin = '*'
    if (whitelist.includes(reqOrigin)) {
      allowOrigin = reqOrigin
      console.log('reqOrigin in whitelist')
    }
    return allowOrigin
  },
  allowMethods: 'DELETE,GET,HEAD,POST,OPTIONS,TRACE',
  allowHeaders: 'Content-Type',
  credentials: true
}))

router.get('/list', (ctx) => {
  ctx.body = 'hi, you get it'
})

app
  .use(router.routes())
  .listen(3000, () => { console.log('listening on port 3000') })
