const log4js = require('log4js');
const moment = require('moment');

log4js.configure({
  appenders: {
    everything: {
      type: 'file',
      filename: `logs/${moment().format('YYYY-MM-DD')}.log`
    }
  },
  categories: {
    default: {
      appenders: ['everything'],
      level: 'info'
    }
  }
});

let logger = log4js.getLogger();

module.exports = logger;
