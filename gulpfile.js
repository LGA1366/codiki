const {src, dest, series, watch} = require('gulp'),
      ttf2woff = require('gulp-ttf2woff'),
      ttf2woff2 = require('gulp-ttf2woff2'),
      concat = require('gulp-concat'),
      sourceMaps = require('gulp-sourcemaps'),
      htmlMin = require('gulp-htmlmin'),
      sass = require('gulp-sass')(require('sass')),
      autoPrefixes = require('gulp-autoprefixer'),
      cleanCss = require('gulp-clean-css'),
      svgSrpite = require('gulp-svg-sprite'),
      image = require('gulp-image'),
      webp = require('gulp-webp'),
      uglify = require('gulp-uglify-es').default,
      babel = require('gulp-babel'),
      del = require('del'),
      notify = require('gulp-notify'),
      browserSync = require('browser-sync').create();

const fileDelBuild = () => {
  return del(['./dist']);
};

const fileDelDev = () => {
  return del(['./dev']);
};

const fontsDev = () => {
  src('./src/fonts/*.ttf')
  .pipe(ttf2woff())
  .pipe(dest('./dev/fonts'));
  return src('./src/fonts/*.ttf')
  .pipe(ttf2woff2())
  .pipe(dest('./dev/fonts'));
};

const fontsDBuild = () => {
  src('./src/fonts/*.ttf')
  .pipe(ttf2woff())
  .pipe(dest('./dist/fonts'));
  return src('./src/fonts/*.ttf')
  .pipe(ttf2woff2())
  .pipe(dest('./dist/fonts'));
};

const stylesDev = () => {
  return src(['./src/vendor-css/*.css', './src/scss/**/*.scss'])
  .pipe(sourceMaps.init())
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(concat('main.css'))
  .pipe(autoPrefixes())
  .pipe(sourceMaps.write())
  .pipe(dest('./dev'))
  .pipe(browserSync.stream());
};

const stylesBuild = () => {
  return src(['./src/vendor-css/*.css', './src/scss/**/*.scss'])
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(concat('main.css'))
  .pipe(autoPrefixes())
  .pipe(cleanCss({
    level: 2
  }))
  .pipe(dest('./dist'));
};

const htmlMinify = () => {
  return src('./src/*.html')
  .pipe(htmlMin({
    collapseWhitespace: true
  }))
  .pipe(dest('dist'));
};

const htmlDev = () => {
  return src('./src/*.html')
  .pipe(dest('./dev'))
  .pipe(browserSync.stream());
};

const svgSpritesDev = () => {
  return src('./src/img/svg/**/*.svg')
  .pipe(svgSrpite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      },
      symbol: true,
    }
  }))
  .pipe(dest('./dev/img'));
};

const svgSpritesBuild = () => {
  return src('./src/img/svg/**/*.svg')
  .pipe(svgSrpite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('./dist/img'))
  ;
};

const scriptsBuild = () => {
  return src(['./src/scripts/vendor-js/**/*.js', './src/scripts/*.js'])
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('scripts.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(dest('./dist'));
};

const scriptsDev = () => {
  return src(['./src/scripts/vendor-js/**/*.js', './src/scripts/*.js'])
  .pipe(sourceMaps.init())
  .pipe(concat('scripts.js'))
  .pipe(sourceMaps.write())
  .pipe(dest('./dev'))
  .pipe(browserSync.stream());
};

const imagesDev = () => {
  return src(['./src/img/**/*.jpg', './src/img/**/*.jpeg', './src/img/**/*.png', './src/img/**/*.webp', './src/img/*.svg'])
  .pipe(image())
  .pipe(webp())
  .pipe(dest('./dev/img'))
  .pipe(browserSync.stream());
};

const imagesBuild = () => {
  return src(['./src/img/**/*.jpg', './src/img/**/*.jpeg', './src/img/**/*.png', './src/img/**/*.webp', './src/img/*.svg'])
  .pipe(image())
  .pipe(webp())
  .pipe(dest('./dist/img'));
};

const watchFilesDev = () => {
  browserSync.init({
    server: {
      baseDir: 'dev'
    }
  });
};

const watchFilesBuild = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
};

watch('./src/*.html', htmlDev);
watch('./src/scss/**/*.scss',stylesDev);
watch(['./src/img/**/*.jpg', './src/img/**/*.jpeg', './src/img/**/*.png', './src/img/**/*.webp'], imagesDev);
watch('./src/img/svg/**/*.svg', svgSpritesDev);
watch('./src/scripts/**/*.js', scriptsDev);

exports.fonts = fontsDev;
exports.dev = series(fileDelDev, fontsDev, htmlDev, stylesDev, scriptsDev, svgSpritesDev, imagesDev, watchFilesDev);
exports.build = series(fileDelBuild, fontsDBuild, stylesBuild, htmlMinify, scriptsBuild, svgSpritesBuild, imagesBuild, watchFilesBuild);
