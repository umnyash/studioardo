// Type
const isProd = process.argv.includes('--production');
const isDev = !isProd;

// Plugins
const {src, dest, watch, series, parallel} = require('gulp');
const del = require('del');
const sync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const gulpIf = require('gulp-if');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

// Copy
const copy = () => {
  return src([
    './source/fonts/*.*',
    './source/img/**/*.gif',
    './source/video/*.*',
    './source/css/*.css',
    './source/js/**/*.js',
    '!./source/js/new.js',
    '!./source/js/demo.js'
  ], { base: './source'})
    .pipe(dest('./build'));
};

// HTML
const html = () => {
  return src('./source/*.html')
    .pipe(dest('./build'))
    .pipe(sync.stream())
};

// Styles
const styles = () => {
  return src('./source/sass/new.scss', { sourcemaps: isDev })
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest('./build/css', { sourcemaps: isDev }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(csso())
    .pipe(dest('./build/css', { sourcemaps: true }))
    .pipe(sync.stream())
};

const minStyles = () => {
  return src('./source/css/tomin/*.css')
    .pipe(rename({ suffix: '.min' }))
    .pipe(csso())
    .pipe(dest('./build/css'))
    .pipe(sync.stream())
}

// Scripts
const scripts = () => {
  return src(['./source/js/new.js', './source/js/demo.js'], { sourcemaps: isDev })
    // .pipe(terser())
    .pipe(dest('./build/js', { sourcemaps: isDev }))
    .pipe(sync.stream())
};

// Images
const images = () => {
  return src('./source/img/**/*.{png,jpg,jpeg,svg}')
  .pipe(newer('./build/img'))
  .pipe(gulpIf(isProd, imagemin([
    imagemin.mozjpeg({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo({
      plugins: [
        { cleanupIDs: false }
      ]
    })
  ])))
  .pipe(dest('./build/img'))
};

// Webp
const createWebp = () => {
  return src([
    './source/img/stone/hero/*.{jpg,jpeg,png}',
    './source/img/team/*.{jpg,jpeg,png}',
    './source/img/offers/*.{jpg,jpeg,png}'
  ], { base: './source' })
    .pipe(webp({quality: 90}))
    .pipe(dest('./build'));
}

// Cleaning
const clear = () => {
  return del('./build');
};

// Watching
const watcher = () => {
  watch('./source/*.html', html);
  watch('./source/sass/**/*.scss', styles);
  watch(['./source/js/new.js', './source/js/demo.js'], scripts);
  watch('./source/img/**/*.{png,jpg,jpeg,svg}', images);
  watch([
    './source/img/stone/hero/*.{jpg,jpeg,png}',
    './source/img/team/*.{jpg,jpeg,png}',
    './source/img/offers/*.{jpg,jpeg,png}'
  ], createWebp);
}

// Server
const server = () => {
  sync.init({
    server: {
      baseDir: './build'
    }
  });
};

// Tasks
exports.copy = copy;
exports.html = html;
exports.styles = styles;
exports.minStyles = minStyles;
exports.scripts = scripts;
exports.images = images;
exports.createWebp = createWebp;
exports.watch = watcher;
exports.clear = clear;


// Build
const build = series(
  clear,
  parallel(copy, html, styles, minStyles, scripts, images, createWebp),
);

// Dev
const dev = series(
  build,
  parallel(server, watcher)
);

exports.default = isProd ? build : dev;
