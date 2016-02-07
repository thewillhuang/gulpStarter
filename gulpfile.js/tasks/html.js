import config from '../config';
import browserSync from 'browser-sync';
import data from 'gulp-data';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import handleErrors from '../lib/handleErrors';
import htmlmin from 'gulp-htmlmin';
import path from 'path';
import render from 'gulp-nunjucks-render';
import fs from 'fs';
const exclude = path.normalize(`!**/{${config.tasks.html.excludeFolders.join(',')}}/**`);

const paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.html'), exclude],
  dest: path.join(config.root.dest, config.tasks.html.dest),
};

const getData = () => {
  const dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFile);
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
};

export default function htmlTask() {
  render.nunjucks.configure([path.join(config.root.src, config.tasks.html.src)], { watch: false });

  return gulp.src(paths.src)
    .pipe(data(getData))
    .on('error', handleErrors)
    .pipe(render())
    .on('error', handleErrors)
    .pipe(gulpif(process.env.NODE_ENV === 'production', htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
}

gulp.task('html', htmlTask);
