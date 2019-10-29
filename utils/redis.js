const Redis = require('ioredis')
const config = require('../config/base.config')

const redis = new Redis({
  port: 6379,
  host: 'localhost',
  family: 4,
  password: 'qweasdzxcv123456789',
  keyPrefix: config.redisPrefix,
  db: 0
})

module.exports = redis
