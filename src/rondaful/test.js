const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const Axios = require('axios');
const os = require('os');

const crawlerApp = new Koa()
const crawlerRouter = new Router()
const axiosConfig = {
    baseURL: `http://0.0.0.0:3001`,
    timeout: 3000,
    validateStatus: (status) => Number.isInteger(status),
};
const axiosInstance = Axios.create(axiosConfig)
// axiosInstance.interceptors.request.use(req => {
//     req.headers['user-agent'] = `Crawler/${os.hostname()}`;
//     return req;
// });
axiosInstance.interceptors.response.use(function (res) {
    return res.data;
}, function (err) {
    return Promise.reject(err.response?.data);
});


let m = 1
crawlerRouter.post('/bind', (ctx) => {
    const body = ctx.request.body;
    console.log('请求', ctx.url, m++, body)

    const errcode = 0
    const message = 'test'

    ctx.body = {
        errcode,
        message
    }
});

(async () => {
    const res = await axiosInstance.post('/bind',
        {
            headers: {
                "user-agent": 'Crawler/legion',
            }
        }).catch(err => {
            console.log('上报异常', err)
        });
    console.log('上报绑定结果');
    console.log('res = ', res.errcode, typeof res.errcode); // 响应 errcode 是 Number 类型
})()


crawlerApp
    .use(koaBody()) // 在路由之前使用
    .use(crawlerRouter.routes())
    .listen(3001, () => { console.log('crawler http listening on port', 3001) })
