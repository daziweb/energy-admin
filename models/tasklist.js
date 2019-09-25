// 任务管理清单 任务列表
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize.db');
const Model = Sequelize.Model;

class TaskList extends Model {}

TaskList.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    userid: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.STRING
    },
    priority: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    modelName: 'tasklist'
  }
);

TaskList.sync();

module.exports = TaskList;
