import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import getEnabledTasks from '../lib/getEnabledTasks';

export default function productionTask(cb) {
  const tasks = getEnabledTasks('production');
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'static', 'rev', cb);
}

gulp.task('production', productionTask);
