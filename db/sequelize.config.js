const mysqlConfig = require('../config/mysql.config');

module.exports = {
  database: mysqlConfig.database,
  username: mysqlConfig.username,
  password: mysqlConfig.password,
  host: mysqlConfig.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true,
    timestamps: false,
    paranoid: false,
    operatorsAliases: false,
    deletedAt: true
  }
};
