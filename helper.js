require('babel-register')({
  presets: [
    'es2015',
    'react',
    'stage-1',
  ],
  plugins: [
    'transform-runtime',
    'transform-flow-strip-types',
  ],
});
require('babel-runtime/core-js/promise').default = require('bluebird');
