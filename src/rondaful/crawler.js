const Koa = require('koa')
const Router = require('koa-router')
const Axios = require('axios');
const os = require('os');

const crawlerApp = new Koa()
const crawlerRouter = new Router({ prefix: '/crawler' })
const axiosConfig = {
    baseURL: `http://0.0.0.0:8090`,
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
    return Promise.reject(err.response.data);
});


let m = 1
crawlerRouter.post('/bind-shop', (ctx) => {
    console.log('请求', ctx.url, m++)

    /*
    { errcode: 1010, message: '数据异常' }
    { errcode: 0, message: '已绑定' }
    { errcode: 1050, message: '浏览器达到上限' }
    { errcode: 1061, message: '正在登陆' }
    { errcode: 1060, message: '第一次登陆' }
    */

    const errcode = 1060
    const message = ''

    ctx.body = {
        errcode,
        message
    }
})

crawlerRouter.post('/task', (ctx) => {
    console.log('请求', ctx.url, m++)

    /*
    { errcode: 1050, message: 'shop unbound !' }
    { errcode: 1061, message: '存在同类型任务正在处理！' }
    { errcode: 1060, message: '暂未登陆成功,无法处理任务！' }
    */

    const errcode = 0
    const message = 'he task begins. Please wait!'

    ctx.body = {
        errcode,
        message
    }
})


crawlerRouter.post('/giveUp-bind', ctx => {
    console.log('请求', ctx.url);
    ctx.body = {
        errcode: 0,
        message: 'ok'
    }
})

const intervalInMsec = 1000 * 6 * 2;

(() => {
    let triggerCount = 1;

    setInterval(async () => {
        // 对象生成要放在里面，才能动态获取 triggerCount
        const server1Info = {
            "free_memory": "12001.02",
            "total_memory": "16271.79",
            "cpu": 8,
            "uptime": 535088,
            "ip": "172.19.23.159",
            "port": 7001,
            "version": "1.0.002",
            "tasks": [
                { "code": "aliexpress_health  ", "path": "" },
                { "code": "ebay_health", "path": "" },
                { "code": "amazon_health  ", "path": "" },
                { "code": "lazada_msg", "path": "" },
                { "code": "lazada_msg_reply", "path": "" },
                { "code": "amazon_listing", "path": "" },
                { "code": "amzon_stock_report", "path": "" },
                { "code": "lazada_health ", "path": "" },
                { "code": "register_email ", "path": "" },
                { "code": "alipay_bill_report", "path": "" },
                { "code": "aliexpress_bill_usd", "path": "" },
                { "code": "aliexpress_bill_cnh  ", "path": "" },
                { "code": "aliexpress_bill_cny", "path": "" },
                { "code": "aliexpress_bill_eur", "path": "" },
                { "code": "aliexpress_bill_rub", "path": "" },
                { "code": "aliexpress_account_balance ", "path": "" },
                { "code": "ebay_account_performance ", "path": "" }
            ],
            "triggerCount": triggerCount
        }
        const server2Info = {
            "free_memory": "4860.35",
            "total_memory": "15931.32",
            "cpu": 12,
            "uptime": 5521,
            "ip": "172.19.23.83",
            "port": 7001,
            "version": "1.0.002",
            "tasks": [
                { "code": "aliexpress_health  ", "path": "" },
                { "code": "ebay_health", "path": "" },
                { "code": "amazon_health  ", "path": "" },
                { "code": "lazada_msg", "path": "" },
                { "code": "lazada_msg_reply", "path": "" },
                { "code": "amazon_listing", "path": "" },
                { "code": "amzon_stock_report", "path": "" },
                { "code": "lazada_health ", "path": "" },
                { "code": "register_email ", "path": "" },
                { "code": "alipay_bill_report", "path": "" },
                { "code": "aliexpress_bill_usd", "path": "" },
                { "code": "aliexpress_bill_cnh  ", "path": "" },
                { "code": "aliexpress_bill_cny", "path": "" },
                { "code": "aliexpress_bill_eur", "path": "" },
                { "code": "aliexpress_bill_rub", "path": "" },
                { "code": "aliexpress_account_balance ", "path": "" },
                { "code": "ebay_account_performance ", "path": "" }
            ],
            "triggerCount": triggerCount,
        };
        await axiosInstance.post('/api/info', server2Info, {
            headers: {
                "user-agent": 'Crawler/legion',
            }
        }).catch(err => {
            console.log('上报异常', err)
        });
        await axiosInstance.post('/api/info', server1Info, {
            headers: {
                "user-agent": 'Crawler/SZzz',
            }
        }).catch(err => {
            console.log('上报异常', err)
        });
        triggerCount += 1;
        console.log('第%s次上报信息', triggerCount);
    }, intervalInMsec)
})()

crawlerApp
    .use(crawlerRouter.routes())
    .listen(3001, () => { console.log('crawler http listening on port', 3001) })
