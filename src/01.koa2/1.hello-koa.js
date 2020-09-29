const Koa = require('koa')
// 实例化
const app = new Koa()

// 配置路由

// 配置中间件

// express 写法
// app.use(function (request, response) {

//     response.send('返回数据')
// })

// koa2 写法
app.use(async (ctx) => {
  // ctx 上下文，包含请求信息和响应信息
  // 响应数据
  ctx.body = 'Hello Koa2'
})

// 监听端口
app.listen(3000, () => {
  console.log('listening on port 3000')
})

// 浏览器访问 localhost:3000 就会显示 ‘Hello Koa2’ (如果是中文注意编码格式为 utf-8)
