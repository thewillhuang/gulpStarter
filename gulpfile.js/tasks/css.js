import config from '../config';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import handleErrors from '../lib/handleErrors.js';
import autoprefixer from 'gulp-autoprefixer';
import path from 'path';

const paths = {
  src: path.join(
    config.root.src, config.tasks.css.src,
    `/**/*.{${config.tasks.css.extensions}}`
  ),
  dest: path.join(config.root.dest, config.tasks.css.dest),
};

export default function cssTask() {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init(config.tasks.css.sourcemaps))
    .pipe(sass(config.tasks.css.settings))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
}

gulp.task('css', cssTask);
