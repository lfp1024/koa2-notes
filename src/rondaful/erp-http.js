const Koa = require('koa')
const Router = require('koa-router')

const erpApp = new Koa()
const erpRouter = new Router({ prefix: '/erp' })

let n = 0
erpRouter.post('/spider_task', (ctx) => {
  const task = {
    "status": 1,
    "tasks": [
      {
        "id": 1093,
        "site": "",
        "params": {
          "account_id": 71,
          "reptile_time": 1598803200,
          "register_time": 1470931200
        },
        "task_id": 16,
        "priority": "9",
        "task_code": "aliexpress_account_balance",
        "channel_id": 4,
        "request_id": "16006847222473257",
        "task_unique": "76615241516",
        "channel_account_id": 71
      },
      {
        "id": 1144,
        "site": "",
        "params": [],
        "task_id": 1,
        "priority": "10",
        "task_code": "aliexpress_health",
        "channel_id": 4,
        "request_id": "16007838004846448",
        "task_unique": "65121599110",
        "channel_account_id": 19
      },
      {
        "id": 1140,
        "site": "",
        "params": {
          "report_date": "2020-7"
        },
        "task_id": 10,
        "priority": "3",
        "task_code": "alipay_bill_report",
        "channel_id": 4,
        "request_id": "16006749723292050",
        "task_unique": "266555735210",
        "channel_account_id": 21,
      }
    ],
    "user_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjEsImV4cCI6MTYzMjIxMDk3MiwiYXVkIjoiIiwibmJmIjoxNjAwNjc0OTcyLCJpYXQiOjE2MDA2NzQ5NzIsImp0aSI6IjVmNjg1YzljNDcyNWQ5LjE0NDA1Mjg3IiwidXNlcl9pZCI6IjEiLCJyZWFsbmFtZSI6Ilx1OGQ4NVx1N2VhN1x1N2JhMVx1NzQwNlx1NTQ1OCIsInVzZXJuYW1lIjoiYWRtaW4iLCJzZXJ2ZXJfdHlwZSI6ZmFsc2V9.cb4f9799adeaa02107564c34dbf17c1c39ad9c2f1e49c756ef721892de612f0f",
    "message": 1
  }

  ctx.body = task;
  console.log('请求', ctx.request.url, n++)
})

erpRouter.post('/spider_receive', ctx => {
  console.log('收到任务结果', ctx.request.body);
  ctx.body = 'ok';
})
erpApp
  .use(erpRouter.routes())
  .listen(3000, () => { console.log('erp http listening on port', 3000) })


