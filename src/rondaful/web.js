const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body')


const app = new Koa();

const router = new Router();

router.get('/test', async ctx => {
    const param = ctx.query
    console.log('param = ', JSON.stringify(param));

    await new Promise(res => setTimeout(res, 10000));

    ctx.status = 200;
    ctx.body = 'success';
    console.log('end');
});

app.use(router.routes())
    .listen('2999', () => { console.log('listening on port 2999') })