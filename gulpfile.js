var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  reactify = require('reactify'),
  livereload = require('gulp-livereload'),
  babelify = require("babelify");

gulp.task('browserify', function () {
  browserify({
    entries: ['./src/js/main.js'], // Only need initial file, browserify finds the deps
    transform: [babelify], // We want to convert JSX to normal javascript
    debug: true, // Gives us sourcemapping
    cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
  }).bundle() // Create the initial bundle when starting the task
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload());
});

gulp.task('watch', ['browserify'], function () {
  livereload.listen();
  gulp.watch('./src/**/*.js', ['browserify']);
  gulp.watch('./src/**/*.jsx', ['browserify']);
});

gulp.task('default', ['watch']);