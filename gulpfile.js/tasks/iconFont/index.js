import config from '../../config';
import gulp from 'gulp';
import iconfont from 'gulp-iconfont';
import generateIconSass from './generateIconSass';
import handleErrors from '../../lib/handleErrors';
import packages from '../../../package.json';
import path from 'path';
const fontPath = path.join(config.root.dest, config.tasks.iconFont.dest);
const cssPath = path.join(config.root.dest, config.tasks.css.dest);

const settings = {
  name: `${packages.name} icons`,
  src: path.join(config.root.src, config.tasks.iconFont.src, '/*.svg'),
  dest: path.join(config.root.dest, config.tasks.iconFont.dest),
  sassDest: path.join(config.root.src, config.tasks.css.src, config.tasks.iconFont.sassDest),
  template: path.normalize('./gulpfile.js/tasks/iconFont/template.sass'),
  sassOutputName: '_icons.sass',
  fontPath: path.relative(cssPath, fontPath),
  className: 'icon',
  options: {
    svg: true,
    timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
    fontName: 'icons',
    prependUnicode: true,
    normalize: false,
    formats: config.tasks.iconFont.extensions,
  },
};

export default function iconFontTask() {
  return gulp.src(settings.src)
    .pipe(iconfont(settings.options))
    .on('glyphs', generateIconSass(settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(settings.dest));
}

gulp.task('iconFont', iconFontTask);
