import webpackConfig from '../lib/webpack-multi-config';
import gulp from 'gulp';
import logger from '../lib/compileLogger';
import webpack from 'webpack';
import browserSync from 'browser-sync';

export default function webpackWatchTask(callback) {
  let initialCompile = false;

  webpack(webpackConfig('development')).watch(200, (err, stats) => {
    logger(err, stats);
    browserSync.reload();
    // On the initial compile, let gulp know the task is done
    if (!initialCompile) {
      initialCompile = true;
      callback();
    }
  });
}

gulp.task('webpack:watch', webpackWatchTask);
