import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

// If you are familiar with Rails, this task the equivalent of `rake assets:precompile`
export default function revTask(cb) {
  gulpSequence(
    'rev-assets',
    'rev-update-references',
    // 'rev-css',
    'update-html',
  cb);
}

gulp.task('rev', revTask);
