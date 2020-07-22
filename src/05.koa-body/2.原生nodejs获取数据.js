const Koa = require("koa")
const Router = require("koa-router")
const views = require("koa-views")
const common = require("./module/common")

const app = new Koa()
const router = new Router({ prefix: "/body" })

app.use(views('views', {
    extension: "ejs"
}))

router.get("/", async ctx => {
    await ctx.render("index")
})

router.post("/do", async ctx => {
    const data = await common.getData(ctx)
    console.log("data is =", data) // username=lfp&password=123456 （需要自己去解析）
    ctx.body = data
})

app
    .use(router.routes())
    .listen(3000, () => { console.log("listening on port 3000") })
