import config from '../config';
import { reject, isNil } from 'ramda';
// Grouped by what can run in parallel
const assetTasks = ['fonts', 'iconFont', 'static', 'images', 'svgSprite'];
const codeTasks = ['html', 'css', 'js'];

const jsTasks = {
  watch: 'webpack:watch',
  development: 'webpack:watch',
  production: 'webpack:production',
};

export default function (env) {
  const matchFilter = (task) => {
    if (config.tasks[task]) {
      if (task === 'js') {
        return jsTasks[env] || jsTasks.watch;
      }
      return task;
    }
  };
  return {
    assetTasks: reject(isNil, assetTasks.map(matchFilter)),
    codeTasks: reject(isNil, codeTasks.map(matchFilter)),
  };
}
