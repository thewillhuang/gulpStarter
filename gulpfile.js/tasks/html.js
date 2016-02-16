import gulp from 'gulp';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import config from '../config';
import htmlmin from 'gulp-htmlmin';
import path from 'path';

const paths = {
  src: path.join(config.root.src, config.tasks.html.src, '/**/*.html'),
  dest: path.join(config.root.dest, config.tasks.html.dest),
};

export default function htmlTask() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulpif(process.env.NODE_ENV === 'production', htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
}

gulp.task('html', htmlTask);
