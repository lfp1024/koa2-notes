const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')

const app = new Koa()
const router = new Router({ prefix: '/ejs' })

// 渲染中间件(第三方中间件)
// const render = views('views', {
//     autoRender: true,    // 默认为true，使用 ctx.body 来接收渲染后的模板字符串
//     // map: { html: 'ejs' }, // 应用ejs模板引擎，文件名后缀必须是 .html
//     extension: 'ejs' // 应用ejs模板引擎，文件名后缀必须是 .ejs
// })
// app.use(render) // 必须在路由之前使用

app.use(views('views', {
  extension: 'ejs'
}))

// 应用级中间件
app.use(async (ctx, next) => {
  ctx.state = {
    info: 'this is public data'
  }
  await next()
})

// 路由中间件
router
  .get('/', async (ctx) => {
    // ctx.body = 'this is homepage'

    // 从数据库获取的数据
    const title = '你好，EJS'

    // 必须加 await，因为渲染是异步的，不加无法获取返回结果，即没有响应，页面显示 'Not Found'
    // 渲染 index.ejs 页面（可以加后缀，也可以不加）
    await ctx.render('index', {
      // 给页面绑定数据
      title
    })
  })
  .get('/news', async (ctx) => {
    // ctx.body = 'this is news page'

    // 数据库获取数据
    const list = ['北京', '天津', '澳门']

    await ctx.render('news', {
      // 绑定数据
      list
    })
  })

app
  .use(router.routes())
  .listen(3000, () => { console.log('listening on prot 3000') })
