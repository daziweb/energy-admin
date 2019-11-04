// 任务清单 controller
const TaskUser = require('../models/taskuser');
const TaskList = require('../models/tasklist');
const moment = require('moment');
const redis = require('../utils/redis');
const utility = require('utility');
const config = require('../config/base.config');
const util = require('../utils/index');

// 获取用户信息
const getUserInfo = async ctx => {
  const { username } = ctx.query;

  let user = await TaskUser.findOne({
    where: {
      username
    }
  });

  try {
    await redis.set(`${config.token}${username}-user`, JSON.stringify(user));

    ctx.body = {
      success: true,
      message: '查询成功',
      data: user
    };
  } catch {
    ctx.body = {
      success: false,
      message: '查询失败'
    };
  }
};

// 用户登录
const login = async ctx => {
  const { username } = ctx.query;
  console.log(username);

  let user = await TaskUser.findOne({
    where: {
      username
    }
  });

  if ( !user ) {
    ctx.body = {
      success: false,
      message: '用户不存在'
    };

    return;
  }

  let token = await utility.md5(username + config.token + new Date().getTime());

  await redis.set(`${config.token}${username}-token`, token);

  if ( token ) {
    ctx.body = {
      success: true,
      message: '登录成功',
      token
    };
  } else {
    ctx.body = {
      success: false,
      message: '查询失败, 用户不存在'
    };
  }
};

// 查询所有任务清单
const findTaskListAll = async ctx => {
  let list = await TaskList.findAll({
    where: {
      status: ['未完成', '完成']
    },
    order: [['status', 'DESC'], ['priority', 'DESC']]
  });

  try {
    ctx.body = {
      success: true,
      message: '查询成功',
      data: list
    };
  } catch {
    ctx.body = {
      success: false,
      message: '查询失败'
    };
  }
};

// 创建任务
const createTask = async ctx => {
  const { usercode, content } = ctx.request.body;

  const taskcode = `TASK${moment().format(
    'YYYYMMDDHHMMSS'
  )}${util.randomSixBitNumber()}`;

  // console.log(taskcode)
  const newtask = await TaskList.create({
    taskcode,
    taskname: '任务',
    content,
    status: '未完成',
    createusercode: usercode,
    priority: '重要'
  });

  if ( newtask ) {
    ctx.body = {
      success: true,
      message: '添加成功'
    };
  } else {
    ctx.body = {
      success: false,
      message: '添加失败'
    };
  }
};

const doneTask = async ctx => {
  const { usercode, taskcode } = ctx.request.body;

  const task = await TaskList.update(
    {
      status: '完成',
      doneusercode: usercode
    },
    {
      where: { taskcode }
    }
  );

  if ( task ) {
    ctx.body = {
      success: true,
      message: '操作成功'
    };
  } else {
    ctx.body = {
      success: false,
      message: '操作失败'
    };
  }
};

const delTask = async ctx => {
  const { usercode, taskcode } = ctx.request.body;

  const task = await TaskList.update(
    {
      status: '移除',
      doneusercode: usercode
    },
    {
      where: { taskcode }
    }
  );

  if ( task ) {
    ctx.body = {
      success: true,
      message: '操作成功'
    };
  } else {
    ctx.body = {
      success: false,
      message: '操作失败'
    };
  }
};

module.exports = { findTaskListAll, createTask, login, getUserInfo, doneTask, delTask };