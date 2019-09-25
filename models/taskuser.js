// 任务管理清单 用户列表
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize.db');
const Model = Sequelize.Model;

class TaskUser extends Model {}

TaskUser.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    userid: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    auth: {
      type: Sequelize.STRING
    },
    avaitor: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    modelName: 'taskuser'
  }
);

TaskUser.sync();

module.exports = TaskUser;
