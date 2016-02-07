import config from '../config';
import gulp from 'gulp';
import browserSync from 'browser-sync';

export default function browserSyncTask() {
  browserSync.init(config.tasks.browserSync);
}
gulp.task('browserSync', browserSyncTask);
