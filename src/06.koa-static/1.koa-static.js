const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const serve = require('koa-static')

const app = new Koa()
const router = new Router({ prefix: '/static' })

app.use(views('views', {
  extension: 'ejs'
}))

// 配置静态资源中间件（静态web服务中间件）（托管静态资源）
// 服务器接受请求会先去静态资源根目录查找，如果能找到，则返回对应的文件，如果找不到再向下匹配路由中间件
// 用请求URL的文件路径拼接静态资源根目录进行查找
// 请求URL http://localhost:3000/css/basic.css 查找路径是 "/static/css/basic.css"， 用 /css/basic.css 拼接 /static

// 相对路径(默认相对于文件当前所在路径，即 _dirname 路径)
// app.use(static("static"))

// 绝对路径
app.use(serve(`${__dirname}/static`))

// 可以配置多个
// 上一个静态资源根目录中没找到，则继续在第二个静态资源根目录下查找
app.use(serve('public'))

router.get('/', async (ctx) => {
  await ctx.render('index')
})

app
  .use(router.routes())
  .listen(3000, () => { console.log('listening on port 3000') })
