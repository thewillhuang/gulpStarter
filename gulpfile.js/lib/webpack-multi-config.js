import config from '../config';
import path from 'path';
import webpack from 'webpack';
import WebpackManifest from './webpackManifest';

export default function (env) {
  const jsSrc = path.resolve(config.root.src, config.tasks.js.src);
  const jsDest = path.resolve(config.root.dest, config.tasks.js.dest);
  const publicPath = path.join(config.tasks.js.dest, '/');
  const filenamePattern = env === 'production' ? '[name]-[chunkhash].js' :
    '[name].js';
  const extensions = config.tasks.js.extensions.map(extension =>
    `.${extension}`);

  const webpackConfig = {
    context: jsSrc,
    plugins: [],
    resolve: {
      root: jsSrc,
      extensions: [''].concat(extensions),
    },
    eslint: {
      configFile: './.eslintrc.json',
      fix: true,
    },
    module: {
      preLoaders: [{
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|bower_components)/,
      }],
      loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: config.tasks.babel.presets,
          plugins: config.tasks.babel.plugins,
          cacheDirectory: true,
        },
      }],
    },
  };

  if (env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.tasks.js.entries;

    webpackConfig.output = {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath,
    };

    if (config.tasks.js.extractSharedJs) {
      // Factor out common dependencies into a shared file
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: config.tasks.js.sharedJsName,
          filename: filenamePattern,
        })
      );
    }
  }

  if (env === 'development') {
    webpackConfig.devtool = 'eval-source-map';
    webpack.debug = true;
  }

  if (env === 'production') {
    webpackConfig.devtool = 'source-map';
    webpackConfig.plugins.push(
      new WebpackManifest(publicPath, config.root.dest),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new webpack.NoErrorsPlugin()
    );
  }

  return webpackConfig;
}
