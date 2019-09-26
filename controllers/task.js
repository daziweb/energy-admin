// 任务清单 controller
const TaskUser = require('../models/taskuser')
const TaskList = require('../models/tasklist')
const moment = require('moment')
const utility = require('utility')
const config = require('../config/base.config')

// 生成token
const getUserInfo = async ctx => {
	const { username } = ctx.query

	let user = await TaskUser.findOne({
		where: {
			username
		}
	})

	try {
		ctx.body = {
			success: true,
			message: '查询成功',
			data: user
		}
	} catch {
		ctx.body = {
			success: false,
			message: '查询失败'
		}
	}
}

// 用户登录
const login = async ctx => {
	const { username } = ctx.query

	let user = await TaskUser.findOne({
		where: {
			username
		}
	})

	if (!user) {
		ctx.body = {
			success: false,
			message: '用户不存在'
		}

		return
	}

	let token = await utility.md5(username + config.token + new Date().getTime())

	let updatetoken = await TaskUser.update(
		{ token },
		{
			where: {
				username
			}
		}
	)

	if (updatetoken) {
		ctx.body = {
			success: true,
			message: '登录成功'
		}
	} else {
		ctx.body = {
			success: false,
			message: '查询失败, 用户不存在'
		}
	}
}

// 查询所有任务清单
const findTaskListAll = async ctx => {
	let list = await TaskList.findAll({
		order: [['id', 'DESC']]
	})

	try {
		ctx.body = {
			success: true,
			message: '查询成功',
			data: list
		}
	} catch {
		ctx.body = {
			success: false,
			message: '查询失败'
		}
	}
}

// 创建任务
const createTask = async ctx => {
	const { userid, content } = ctx.request.body
}

module.exports = { findTaskListAll, createTask, login, getUserInfo }
