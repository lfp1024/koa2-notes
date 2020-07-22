const Koa = require("koa")
const Router = require("koa-router")
const views = require("koa-views")
const koaBody = require("koa-body")

const app = new Koa()
const router = new Router({ prefix: "/body" })

app.use(views('views', {
    extension: "ejs"
}))

router.get("/", async ctx => {
    await ctx.render("index")
})

router.post('/do', async ctx => {
    // 拿到表单提交的数据
    console.log("body is = ", ctx.request.body) // body is =  { username: 'lfp', password: '12345' }
    ctx.body = ctx.request.body
})

app
    .use(koaBody()) // 在路由之前使用
    .use(router.routes())
    .listen(3000, () => { console.log("listening on port 3000") })

// console.log('curl -i http://localhost:3000/users -d "name=test"');