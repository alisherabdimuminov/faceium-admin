module.exports = {
    apps: [
      {
        name: 'faceium-admin',
        port: '3001',
        exec_mode: 'cluster',
        instances: 1,
        script: './.output/server/index.mjs'
      }
    ]
  }
  