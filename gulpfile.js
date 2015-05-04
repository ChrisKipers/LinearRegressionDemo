var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  reactify = require('reactify'),
  livereload = require('gulp-livereload'),
  babelify = require("babelify"),
  sass = require('gulp-sass'),
  concatCss = require('gulp-concat-css'),
  sourcemaps = require('gulp-sourcemaps');

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

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: ['node_modules/foundation/scss']}))
    .pipe(sourcemaps.write())
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', ['browserify', 'sass'], function () {
  livereload.listen();
  gulp.watch('./src/**/*.js', ['browserify']);
  gulp.watch('./src/**/*.jsx', ['browserify']);
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);