// import './asyncModules';
import exclaimify from './exclaimify';

const button = document.getElementById('button');

const alertAsyncMessage = () => {
  // CommonJS async syntax webpack magic
  require.ensure([], () => {
    const message = require('./asyncMessage').default;
    console.log(exclaimify(message));
  });
};

console.log(`
  asset references like this one:
    images/gulp.png
  get updated in js too!!`);

button.addEventListener('click', alertAsyncMessage);
