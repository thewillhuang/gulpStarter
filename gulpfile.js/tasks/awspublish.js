import config from '../config';
import parallelize from 'concurrent-transform';
import awspublish from 'gulp-awspublish';
import gulpFilter from 'gulp-filter';
import gulp from 'gulp';

gulp.task('publish', () => {
  const gzipFilter = gulpFilter(config.tasks.aws.gzip, { restore: true });
  const htmlFilter = gulpFilter(config.tasks.aws.html, { restore: true });
  const publisher = awspublish.create(config.tasks.aws.create);
  return gulp.src(config.tasks.aws.src, config.tasks.aws.srcBase)
    .pipe(gzipFilter)
    .pipe(awspublish.gzip())
    .pipe(gzipFilter.restore)
    .pipe(htmlFilter)
    .pipe(parallelize(publisher.publish(config.tasks.aws.noCache), 100))
    .pipe(htmlFilter.restore)
    .pipe(parallelize(publisher.publish(config.tasks.aws.headers), 100))
    .pipe(publisher.cache())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});
