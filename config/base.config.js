module.exports = {
  base: {
    name: 'energy',
    version: '1.0.0',
    author: 'QiuDaGang',
    email: '1024933801@qq.com'
  },
  redisPrefix: 'taskuser:',
  token: 'task-admin-token',
  server: process.env.NODE_APP_URL,
  port: process.env.PORT
};
