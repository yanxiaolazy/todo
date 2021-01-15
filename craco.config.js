const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': 'rgba(112, 182, 115, 1)',
              '@text-color': '#636e72' 
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}