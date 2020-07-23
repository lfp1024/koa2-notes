const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
const path = require('path')

const app = new Koa()
const router = new Router({ prefix: '/art' })

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
})

// 应用级中间件
app.use(async (ctx, next) => {
  ctx.state = {
    info: 'this is public data'
  }
  await next()
})

router.get('/', async (ctx) => {
  // 从数据库获取的数据
  const title = '你好，art-template'
  const list = {
    name: '张三',
    h: '<h2>这是一个h2数据</h2>',
    num: 20,
    data: ['北京', '天津', '澳门']
  }

  await ctx.render('index', {
    title,
    list
  })
})

router.get('/news', async (ctx) => {
  // 数据库获取数据
  const list = {
    name: '张三',
    h: '<h2>这是一个h2数据</h2>',
    num: 20,
    data: ['北京', '天津', '澳门']
  }

  await ctx.render('news', {
    // 绑定数据
    list
  })
})

app
  .use(router.routes())
  .listen(3000, () => { console.log('listening on port 3000') })
