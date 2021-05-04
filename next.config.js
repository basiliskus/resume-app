const withTM = require('next-transpile-modules')([
  'unist-util-is',
  'unist-util-visit-parents',
  'unist-util-select',
]);

module.exports = withTM({
  future: {
    webpack5: true,
  },
});
