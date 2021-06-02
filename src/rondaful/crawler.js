const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const Axios = require('axios');
const os = require('os');

const crawlerApp = new Koa()
const crawlerRouter = new Router()
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
    return Promise.reject(err.response?.data);
});


let m = 1
crawlerRouter.post('/bind', (ctx) => {
    const body = ctx.request.body;
    console.log('请求', ctx.url, m++, body)

    const errcode = '152020'
    const message = 'test'

    setTimeout(async () => {
        const successfulData = {
            bind_no: body.bind_no,
            group_no: body.group_no,
            errcode: 0,
            message: '账号登录成功',
        }
        const failedData = {
            bind_no: body.bind_no,
            group_no: body.group_no,
            errcode: 1,
            message: '账号登录失败',
        }
        const fatalException = {
            bind_no: body.bind_no,
            group_no: body.group_no,
            errcode: 1,
            message: '账号登录失败',
            errtype: 'fatal-exception',
            taskTypeId: body.task_type_id,
        }

        // const responseData = !!Math.round(Math.random()) ? successfulData : failedData;
        // const responseData = fatalException;
        const responseData = successfulData;
        // const responseData = failedData;
        await axiosInstance.post('/api/bind-result',
            responseData,
            {
                headers: {
                    "user-agent": 'Crawler/legion',
                }
            }).catch(err => {
                console.log('上报异常', err)
            });
        console.log('上报绑定结果');
    }, 3000)

    ctx.body = {
        errcode,
        message,
        err_type: 'fatal-exception'
    }
})

let msg = { message: '短信还未到达,请继续获取', data: [] };
crawlerRouter.get('/tt', async (ctx) => {
    console.log('lllllllllllllllllll ', ctx.request);
    // console.log('22222 ', ctx.query);
    // const res = await axiosInstance.post('/api/task-rpc/1533873/post?url=automationInfo', {
    //     shop_id: 5340,
    //     relation_module: 0
    // }, {
    //     headers: {
    //         rpcOption: JSON.stringify({ "sync": true, "repost": { "interval": 5000, "max_count": 2 } })
    //     }
    // });
    // console.log('======================== ', res);


    setTimeout(() => {
        msg = { message: '短信还未到达,请继续获取', data: [{ data: "haha" }] }
    }, 2000)
    console.log('3334444444444444444444 ', msg);
    ctx.body = msg;
})

crawlerRouter.post('/task', async (ctx) => {
    console.log('请求', ctx.url, m++)

    const errcode = 0
    const message = 'the task begins. Please wait!'

    setTimeout(async () => {
        await axiosInstance.post('/api/receive',
            {
                "task_id": ctx.request.body.task_id, "bind_no": ctx.request.body.bind_no, "is_child": 0, err_code: 0, message: "ok",
                "data": { "goods_id": '成功' }
            },
            {
                headers: {
                    "user-agent": 'Crawler/legion',
                }
            })
            .then(result => {
                console.log('result', result)
            })
            .catch(err => {
                console.log('回传异常', err)
            });
    }, 5000);
    ctx.body = {
        errcode,
        message,
        err_type: 'fatal-exception'
    }


})


crawlerRouter.post('/unbind', ctx => {
    console.log('请求', ctx.url, JSON.stringify(ctx.request.body));
    const body = ctx.request.body;
    setTimeout(async () => {
        const successfulData = {
            bind_no: body.bind_no,
            group_no: body.group_no,
            errcode: 0,
            message: '解绑成功',
        }
        const failedData = {
            bind_no: body.bind_no,
            group_no: body.group_no,
            errcode: 1,
            message: '解绑失败',
        }
        const fatalException = {
            bind_no: body.bind_no,
            group_no: body.group_no,
            errcode: 1,
            message: '解绑严重失败',
            err_type: 'fatal-exception',
        }

        // const responseData = !!Math.round(Math.random()) ? successfulData : failedData;
        const responseData = fatalException;
        // const responseData = successfulData;
        // const responseData = failedData;
        await axiosInstance.post('/api/unbind-result',
            responseData,
            {
                headers: {
                    "user-agent": 'Crawler/legion',
                }
            }).catch(err => {
                console.log('上报异常', err)
            });
        console.log('上报解绑结果');
    }, 3000)

    ctx.body = {
        errcode: 0,
        message: 'ok',
        // err_type: 'fatal-exception'
    }

    // ctx.body = {
    //     errcode: 1,
    //     message: 'fail'
    // }
})

const intervalInMsec = 1000 * 6;

(() => {
    let triggerCount = 1;

    setInterval(async () => {
        // 对象生成要放在里面，才能动态获取 triggerCount
        const server1Info = {
            "free_memory": "12001.02",
            "total_memory": "16271.79",
            "cpu": 8,
            "uptime": 535088,
            "ip": "localhost",
            "port": 3001,
            "version": "1.0.002",
            "task_max_number": 20,
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
            "ip": "localhost",
            "port": 3001,
            "version": "1.0.002",
            "task_max_number": 3,
            "tasks": [
                { "code": "aliexpress_health  ", "path": "" }, // 12
                { "code": "amazon_kw_productclasses", "path": "" },
                { "code": "amazon_listing_item", "path": "" },
                { "code": "ebay_health", "path": "" },
                { "code": "amazon_health  ", "path": "" },
                { "code": "lazada_msg", "path": "" }, // 2
                { "code": "lazada_msg_reply", "path": "" },
                { "code": "amazon_listing", "path": "" },
                { "code": "amzon_stock_report", "path": "" },
                { "code": "lazada_health ", "path": "" },
                { "code": "register_email ", "path": "" },
                { "code": "alipay_bill_report", "path": "" }, //10
                { "code": "aliexpress_bill_usd", "path": "" },
                { "code": "aliexpress_bill_cnh  ", "path": "" },
                { "code": "aliexpress_bill_cny", "path": "" },
                { "code": "aliexpress_bill_eur", "path": "" },
                { "code": "aliexpress_bill_rub", "path": "" },
                { "code": "aliexpress_account_balance ", "path": "" }, // 11
                { "code": "ebay_account_performance ", "path": "" },
            ],
            "triggerCount": triggerCount,
            "mode": 1,
        };
        await axiosInstance.post('/api/info', server2Info, {
            headers: {
                "user-agent": 'Crawler/legion',
            }
        }).catch(err => {
            console.log('上报异常', err)
        });

        // await axiosInstance.post('/api/info', server1Info, {
        //     headers: {
        //         "user-agent": 'Crawler/SZzz',
        //     }
        // }).catch(err => {
        //     console.log('上报异常', err)
        // });

        triggerCount += 1;
        console.log('第%s次上报信息', triggerCount);
    }, intervalInMsec)
})()

// new Array(2).fill(null).forEach(async ele => {
//     const server2Info = {
//         "free_memory": "4860.35",
//         "total_memory": "15931.32",
//         "cpu": 12,
//         "uptime": 5521,
//         "ip": "localhost",
//         "port": 3001,
//         "version": "1.0.002",
//         "task_max_number": 2,
//         "tasks": [
//             { "code": "aliexpress_health  ", "path": "" },
//             { "code": "ebay_health", "path": "" },
//             { "code": "amazon_health  ", "path": "" },
//             { "code": "lazada_msg", "path": "" },
//             { "code": "lazada_msg_reply", "path": "" },
//             { "code": "amazon_listing", "path": "" },
//             { "code": "amzon_stock_report", "path": "" },
//             { "code": "lazada_health ", "path": "" },
//             { "code": "register_email ", "path": "" },
//             { "code": "alipay_bill_report", "path": "" },
//             { "code": "aliexpress_bill_usd", "path": "" },
//             { "code": "aliexpress_bill_cnh  ", "path": "" },
//             { "code": "aliexpress_bill_cny", "path": "" },
//             { "code": "aliexpress_bill_eur", "path": "" },
//             { "code": "aliexpress_bill_rub", "path": "" },
//             { "code": "aliexpress_account_balance ", "path": "" },
//             { "code": "ebay_account_performance ", "path": "" },
//         ],
//         "triggerCount": 1,
//     };
//     await axiosInstance.post('/api/info', server2Info, {
//         headers: {
//             "user-agent": 'Crawler/legion233',
//         }
//     }).catch(err => {
//         console.log('上报异常', err)
//     });
// });

crawlerApp
    .use(koaBody()) // 在路由之前使用
    .use(crawlerRouter.routes())
    .listen(3001, () => { console.log('crawler http listening on port', 3001) })
    