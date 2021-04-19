const Koa = require('koa');
const KeyGrip = require("keygrip")
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const apis =  require('./apis');

// logger
const logger = async(ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(rt, 'tt');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
}
app.use(logger)
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});
  
// 设置允许接收的数据类型
app.use(async (ctx, next) => {
    switch (ctx.accepts('json', 'html', 'text')) {
        case 'json': break;
        case 'html': break;
        case 'text': break;
        default: ctx.throw(406, 'json, html, or text only');
    }
    // ctx.cookies.set('name', 'tobi', { signed: true });
    await next()
});

// 获取post请求的参数
app.use(bodyParser())

// 加载路由 接口api
app.use(apis.routes(), apis.allowedMethods());

app.listen(8090);
app.callback(() =>
 {
    console.log('8090端口已启动')
})
