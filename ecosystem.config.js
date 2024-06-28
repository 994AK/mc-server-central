module.exports = {
  apps: [
    {
      name: 'blog_yuhua_mc',
      script: 'serve',
      args: ['-s', 'dist', '-l', '4124'],
      env: {
        NODE_ENV: 'production',
      },
      watch: false
    }
  ]
};