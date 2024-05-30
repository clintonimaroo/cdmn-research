module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://api.resend.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};