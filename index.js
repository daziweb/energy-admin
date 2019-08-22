const Koa = require('koa');
const Router = require('koa-router');
const requireDirectory = require('require-directory');
const onerror = require('koa-onerror');
const baseConfig = require('./config/base.config');
const cors = require('@koa/cors');
const koaParser = require('koa-bodyparser');
require('colors');
require('./db/sequelize.db');
const app = new Koa();

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
      'Access-Control-Allow-Origin'
    ]
  })
);

requireDirectory(module, './routes', {
  visit: router => {
    if (router instanceof Router) {
      app.use(router.routes(), router.allowedMethods());
    }
  }
});

app.listen(baseConfig.server.port || 3000, () => {
  console.log(
    `server is running at ${baseConfig.server.host ||
      'http://localhost'}:${baseConfig.server.port || 3000}`
  );
});
