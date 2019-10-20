const Energy = require('../models/index');
const moment = require('moment');

const findLastOne = async ctx => {
  let list = await Energy.findAll({
    order: [['id', 'DESC']],
    limit: 1
  });

  return list;
};

const findAll = async ctx => {
  let list = await Energy.findAll({
    order: [['id', 'DESC']]
  });

  if (list && list.length) {
    ctx.body = {
      success: true,
      message: '查询成功',
      data: list
    };
  } else {
    ctx.body = {
      success: false,
      message: '查询失败'
    };
  }
};

const createData = async ctx => {
  const { energy } = ctx.request.body;
  const data = await findLastOne();

  if (data && data.length) {
    const obj = data[0];

    if (Number(obj.currentEnergy) >= Number(energy)) {
      ctx.body = {
        success: false,
        message: '当前能量不能小于上次当前能量'
      };
      return;
    }

    // 参数
    let id = Number(obj.id) + 1;
    // 时间
    let recordDate = moment().format('M/D');
    // 当前能量
    let currentEnergy = Number(energy);
    // 今日营收 = 本次当前能量 - 上次当前能量
    let todayRevenue = Number(energy) - Number(obj.currentEnergy);
    // 营收累计 = 上次营收累计 + 本次今日营收
    let totalRevenue = Number(obj.totalRevenue) + Number(todayRevenue);
    // 近期平均 = 本次营收累计 / 参数
    let average = Math.round(Number(totalRevenue) / Number(id));

    await Energy.create({
      id,
      recordDate,
      currentEnergy,
      todayRevenue,
      totalRevenue,
      average
    })
      .then(result => {
        ctx.body = {
          success: true,
          message: '操作成功',
          data: result
        };
      })
      .catch(error => {
        ctx.body = {
          success: false,
          message: '操作错误',
          data: error
        };
      });
  } else {
    ctx.body = {
      success: false,
      message: '查询错误,请联系后台服务人员'
    };
  }
};

const deleteData = async ctx => {
  const { id } = ctx.request.body;
  console.log(id);
  await Energy.destroy({
    where: {
      id
    }
  })
    .then(result => {
      ctx.body = {
        success: true,
        message: '操作成功',
        data: result
      };
    })
    .catch(error => {
      ctx.body = {
        success: false,
        message: '操作错误',
        data: error
      };
    });
};

module.exports = {
  findAll,
  createData,
  deleteData
};
