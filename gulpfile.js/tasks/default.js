import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import getEnabledTasks from '../lib/getEnabledTasks';

export default function defaultTask(cb) {
  const tasks = getEnabledTasks('watch');
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'static', 'watch', cb);
}

gulp.task('default', defaultTask);
