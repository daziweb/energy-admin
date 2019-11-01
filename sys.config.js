module.exports = {
  apps: [{
    name: 'production',
    script: './index.js',
    env: {
      'NODE_ENV': 'production',
      'PORT': 4002,
      'NODE_APP_URL': 'http://118.24.29.58'
    }
  }]
};