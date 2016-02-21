import config from '../../config';
import gulp from 'gulp';
import path from 'path';
import revReplace from 'gulp-rev-replace';

// 5) Update asset references in HTML
gulp.task('update-html', () => {
  const manifest = gulp.src(path.join(config.root.dest, 'rev-manifest.json'));
  return gulp.src(path.join(config.root.dest, config.tasks.html.dest, '/**/*.html'))
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest(config.root.dest));
});
