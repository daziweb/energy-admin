const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize.db');
const Model = Sequelize.Model;

class Energy extends Model {}

Energy.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    recordDate: {
      type: Sequelize.STRING
    },
    currentEnergy: {
      type: Sequelize.INTEGER
    },
    todayRevenue: {
      type: Sequelize.INTEGER
    },
    totalRevenue: {
      type: Sequelize.INTEGER
    },
    average: {
      type: Sequelize.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'list'
  }
);

Energy.sync();

module.exports = Energy;
