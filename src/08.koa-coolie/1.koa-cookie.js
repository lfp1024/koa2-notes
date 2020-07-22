const Koa = require("koa")
const Router = require("koa-router")
const render = require("koa-art-template")
const path = require("path")

const app = new Koa()
const router = new Router({ prefix: "/cookie" })

render(app, {
    root: path.join(__dirname, "views"),
    extname: ".html",
})


router.get("/", async ctx => {

    // 设置Cookie
    // 在响应报文中通过 Set-Cookie 字段传递给客户端
    ctx.cookies.set("username", "lfp", {
        maxAge: 60 * 1000 * 60 * 24,
        // path: '/cookie/news', // 只有路径匹配才能
        // domain:'.baidu.com' // 此时 只有访问百度相关的网站，baike.baidu.com tieba.baidu.com 才可以携带Cookie
        httpOnly: false // 在客户端可以通过 JS代码访问

    })
    await ctx.render("index")

    ctx.body = "设置cookie"
})

router.get('/shop', async ctx => {

    // 无法获取Cookie
    // 在请求报文中没有 Cookie 字段
    const cookie = ctx.cookies.get("username")
    console.log("cookie = ", cookie)
    ctx.body = cookie || "cookie is"
})

router.get('/news', async ctx => {

    // 可以获取Cookie
    // 在请求报文中携带 Cookie 字段
    const cookie = ctx.cookies.get("username")

    ctx.render("news", {
        cookie
    })
})

router.get('/news/info', async ctx => {

    // 可以获取Cookie
    // 在请求报文中携带 Cookie 字段
    const cookie = ctx.cookies.get("username")

    ctx.body = "cookie is " + cookie
})

app
    .use(router.routes())
    .listen(3000, () => { console.log("listening on port 3000") })
