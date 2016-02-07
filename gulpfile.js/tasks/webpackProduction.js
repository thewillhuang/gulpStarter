import webpackConfig from '../lib/webpack-multi-config.js';
const config = webpackConfig('production');
import gulp from 'gulp';
import logger from '../lib/compileLogger';
import webpack from 'webpack';

export default function webpackProductionTask(callback) {
  webpack(config, (err, stats) => {
    logger(err, stats);
    callback();
  });
}

gulp.task('webpack:production', webpackProductionTask);
