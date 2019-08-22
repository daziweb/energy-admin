const env = process.argv[2].split('=')[1];

module.exports = {
  base: {
    name: 'energy',
    version: '1.0.0',
    author: 'QiuDaGang',
    email: '1024933801@qq.com'
  },
  server:
    env === 'production' ? require('./prod.config') : require('./dev.config')
};
