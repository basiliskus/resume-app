const withTM = require('next-transpile-modules')([
  'unist-util-is',
  'unist-util-visit-parents',
  'unist-util-select',
]);

module.exports = withTM({
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.(scss|css)$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: (fileName, options) => options.query.type || 'scoped',
          },
        },
      ],
    });

    return config;
  },
});
