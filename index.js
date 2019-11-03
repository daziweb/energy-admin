const Koa = require('koa');
const Router = require('koa-router');
const requireDirectory = require('require-directory');
const onerror = require('koa-onerror');
const baseConfig = require('./config/base.config');
const cors = require('@koa/cors');
const koaParser = require('koa-bodyparser');
require('colors');
require('./db/sequelize.db');
const redis = require('./utils/redis');
const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

onerror(app);

app.use(async (ctx, next) => {
  ctx.util = {
    log: require('./utils/log')
  };

  await next();
});

app.use(async (ctx, next) => {
  let start = new Date().getTime();

  await next();

  let times = new Date().getTime() - start;
  ctx.util.log.info(
    `method: ${ctx.method} url: ${ctx.url} time: ${times}ms ${JSON.stringify(
      ctx.body
    )}`
  );
});

app.use(koaParser());

app.use(
  cors({
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Content-Type'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'UPDATE', 'DELETE'],
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Access-Control-Allow-Origin',
      'token',
      'username'
    ]
  })
);

// 验证token
app.use(async (ctx, next) => {
  // 不是登录接口都需要验证 token
  console.log(ctx.url.indexOf('/user/login'));
  if ( ctx.url.indexOf('/user/login') === -1 ) {
    const token = ctx.header.token;
    const username = ctx.header.username;
    let redisToken = '';
    await redis.get(`${baseConfig.token}${username}-token`).then(function (result) {
      redisToken = result;
    });

    if ( token !== redisToken ) {
      ctx.body = {
        success: false,
        code: 888,
        message: '你已在别处登录'
      };
    } else {
      await next();
    }
  } else {
    await next();
  }
});

requireDirectory(module, './routes', {
  visit: router => {
    if ( router instanceof Router ) {
      app.use(router.routes(), router.allowedMethods());
    }
  }
});

server.listen(baseConfig.port, () => {
  console.log(`server is running at ${baseConfig.port}`);
  // console.log(server)
});

io.on('connection', require('./utils/socket'));