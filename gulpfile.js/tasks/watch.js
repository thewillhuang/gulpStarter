import config from '../config';
import gulp from 'gulp';
import path from 'path';
import watch from 'gulp-watch';

export default function watchTask() {
  const watchableTasks = ['fonts', 'iconFont', 'images', 'static', 'svgSprite', 'html', 'css'];

  watchableTasks.forEach(taskName => {
    const task = config.tasks[taskName];
    if (task) {
      const glob = path.join(config.root.src, task.src, '**/**');
      watch(glob, () => {
        require(`./${taskName}`).default();
      });
    }
  });
}

gulp.task('watch', ['browserSync'], watchTask);
