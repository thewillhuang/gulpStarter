import config from '../config';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import svgstore from 'gulp-svgstore';
import path from 'path';

export default function svgSpriteTask() {
  const settings = {
    src: path.join(config.root.src, config.tasks.svgSprite.src, '/*.svg'),
    dest: path.join(config.root.dest, config.tasks.svgSprite.dest),
  };

  return gulp.src(settings.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream());
}

gulp.task('svgSprite', svgSpriteTask);
