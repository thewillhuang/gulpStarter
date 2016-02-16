const neat = require('node-neat').includePaths;

const root = {
  src: './src',
  dest: './public',
};

export default {
  root: {
    src: root.src,
    dest: root.dest,
  },
  tasks: {
    babel: {
      presets: ['react', 'stage-1'],
      plugins: [
        'transform-es2015-template-literals',
        'transform-es2015-literals',
        'transform-es2015-function-name',
        'transform-es2015-arrow-functions',
        'transform-es2015-block-scoped-functions',
        'transform-es2015-classes',
        'transform-es2015-object-super',
        'transform-es2015-shorthand-properties',
        'transform-es2015-computed-properties',
        'transform-es2015-for-of',
        'transform-es2015-sticky-regex',
        'transform-es2015-unicode-regex',
        'check-es2015-constants',
        'transform-es2015-spread',
        'transform-es2015-parameters',
        'transform-es2015-destructuring',
        'transform-es2015-block-scoping',
        'transform-es2015-typeof-symbol',
        ['transform-regenerator', {
          async: false,
          asyncGenerators: false,
        }],
        'transform-runtime',
        'transform-flow-strip-types',
      ],
    },
    aws: {
      src: `${root.dest}/**/*`,
      srcBase: {
        base: root.dest,
      },
      create: {
        params: {
          Bucket: 'whatever.com',
        },
        region: 'us-west-2',
      },
      headers: {
        'Cache-Control': 'max-age=315360000, no-transform, public',
      },
      noCache: {
        'Cache-Control': 'max-age=0, no-transform, public',
      },
      gzip: [
        '**/*.js',
        '**/*.html',
        '**/*.css',
        '**/*.less',
        '**/*.scss',
        '**/*.sass',
        '**/*.svg',
        '**/*.txt',
        '**/*.json',
        '**/*.ico',
        '**/*.otf',
        '**/*.ttf',
        '**/*.map',
        '**/*.md',
      ],
      html: [
        '**/*.html',
        '**/*.json',
      ],
    },
    browserSync: {
      server: {
        baseDir: 'public',
      },
    },

    statics: {
      src: 'static',
      dest: './',
    },

    js: {
      src: 'javascripts',
      dest: 'javascripts',
      extractSharedJs: true,
      sharedJsName: 'shared',
      entries: {
        app: ['./app.js'],
        page: ['./page.js'],
      },
      extensions: ['js', 'jsx'],
    },

    css: {
      src: 'stylesheets',
      dest: 'stylesheets',
      autoprefixer: {
        browsers: ['> 1%', 'last 3 version'],
      },
      settings: {
        indentedSyntax: true,
        includePaths: neat,
      },
      sourcemaps: {
        loadMaps: true,
        debug: true,
      },
      extensions: ['sass', 'scss', 'css'],
    },

    html: {
      src: 'html',
      dest: './',
      htmlmin: {
        collapseWhitespace: true,
      },
    },

    images: {
      src: 'images',
      dest: 'images',
      extensions: ['jpg', 'png', 'svg', 'gif'],
    },

    fonts: {
      src: 'fonts',
      dest: 'fonts',
      extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg'],
    },

    iconFont: {
      src: 'icons',
      dest: 'fonts',
      sassDest: 'generated',
      extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg'],
    },

    svgSprite: {
      src: 'sprites',
      dest: 'images',
      extensions: ['svg'],
    },
  },
};
