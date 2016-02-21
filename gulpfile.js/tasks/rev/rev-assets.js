import config from '../../config';
import gulp from 'gulp';
import path from 'path';
import rev from 'gulp-rev';
import revNapkin from 'gulp-rev-napkin';

const ignoreThese = `!${path.join(
  config.root.dest, '/**/*+(json|html)'
)}`;
// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', () =>
  gulp.src([path.join(config.root.dest, '/**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(config.root.dest))
    .pipe(revNapkin({ verbose: true }))
    .pipe(rev.manifest(path.join(config.root.dest, 'rev-manifest.json'), { merge: true }))
    .pipe(gulp.dest(''));
);
