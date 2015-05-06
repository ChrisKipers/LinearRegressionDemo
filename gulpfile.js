var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  livereload = require('gulp-livereload'),
  babelify = require("babelify"),
  sass = require('gulp-sass'),
  concatCss = require('gulp-concat-css'),
  sourcemaps = require('gulp-sourcemaps'),
  eslint = require('gulp-eslint'),
  babel = require('gulp-babel');

gulp.task('browserify', function () {
  return browserify({
    entries: ['./src/js/main.js'], // Only need initial file, browserify finds the deps
    transform: [babelify], // We want to convert JSX to normal javascript
    debug: true, // Gives us sourcemapping
    cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
  }).bundle() // Create the initial bundle when starting the task
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload());
});

gulp.task('compileWorkers', function () {
  return gulp.src('src/js/workers/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js/workers'));
});

gulp.task('compileJs', ['browserify', 'compileWorkers']);

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: ['node_modules/foundation/scss', 'node_modules/bootstrap-sass/assets/stylesheets']}))
    .pipe(sourcemaps.write())
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('lint', function () {
  return gulp.src('./src/js/**/*.js*')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', ['compileJs', 'sass'], function () {
  livereload.listen();
  gulp.watch('./src/**/*.js*', ['lint','compileJs']);
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);