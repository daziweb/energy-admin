const Koa = require('koa')
const Router = require('koa-router')
const requireDirectory = require('require-directory')
const onerror = require('koa-onerror')
// const baseConfig = require('./config/base.config');
const cors = require('@koa/cors')
const koaParser = require('koa-bodyparser')
require('colors')
require('./db/sequelize.db')
require('./utils/redis')
const app = new Koa()

onerror(app)

app.use(async (ctx, next) => {
	ctx.util = {
		log: require('./utils/log')
	}

	await next()
})

app.use(async (ctx, next) => {
	let start = new Date().getTime()

	await next()

	let times = new Date().getTime() - start
	ctx.util.log.info(
		`method: ${ctx.method} url: ${ctx.url} time: ${times}ms ${JSON.stringify(
			ctx.body
		)}`
	)
})

app.use(koaParser())

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
			'token'
		]
	})
)

requireDirectory(module, './routes', {
	visit: router => {
		if (router instanceof Router) {
			app.use(router.routes(), router.allowedMethods())
		}
	}
})

app.listen(4002, () => {
	console.log(`server is running at 4002`)
})
