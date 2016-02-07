import config from '../../config';
import gulp from 'gulp';
import path from 'path';
import revReplace from 'gulp-rev-replace';

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', () => {
  const manifest = gulp.src(path.join(config.root.dest, 'rev-manifest.json'));

  return gulp.src(path.join(config.root.dest, '/**/**.{css,js}'))
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest(config.root.dest));
});
