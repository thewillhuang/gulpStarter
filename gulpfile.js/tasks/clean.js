import gulp from 'gulp';
import del from 'del';
import config from '../config';

export default function cleanTask(cb) {
  del([config.root.dest]).then(() => {
    cb();
  });
}

gulp.task('clean', cleanTask);
