import config from '../../config';
import gulp from 'gulp';
import minify from 'gulp-cssnano';
import path from 'path';
import rev from 'gulp-rev';
import sourcemaps from 'gulp-sourcemaps';
import revNapkin from 'gulp-rev-napkin';

// 4) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css', () => {
  gulp.src(path.join(config.root.dest, '/**/*.css'))
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(rev())
  .pipe(minify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.root.dest))
  .pipe(revNapkin({ verbose: false }))
  .pipe(rev.manifest(path.join(config.root.dest, 'rev-manifest.json'), { merge: true }))
  .pipe(gulp.dest(''));
});
