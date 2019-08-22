const Sequelize = require('sequelize');
const sequelizeConfig = require('./sequelize.config');

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  {
    host: sequelizeConfig.host,
    dialect: sequelizeConfig.dialect,
    pool: sequelizeConfig.pool
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(error => {
    console.log(`数据库连接错误： ${error}`);
  });

module.exports = sequelize;
