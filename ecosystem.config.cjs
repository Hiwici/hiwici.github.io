module.exports = {
  apps: [
    {
      name: 'hiwici.github.io',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        HOST: '0.0.0.0',
      },
    },
  ],
}
