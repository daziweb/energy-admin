// 任务清单 controller
const TaskUser = require('../models/taskuser');
const TaskList = require('../models/tasklist');
const moment = require('moment');

// 查询所有任务清单
const findTaskListAll = async ctx => {
  let list = await TaskList.findAll({
    order: [['id', 'DESC']]
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
  const { userid, content } = ctx.request.body;
};

module.exports = { findTaskListAll, createTask };
