import config from '../config';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import path from 'path';

const paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**'),
  dest: path.join(config.root.dest, config.tasks.images.dest),
};

export default function imagesTask() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
}

gulp.task('images', imagesTask);
