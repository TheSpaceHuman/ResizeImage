var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var rename  = require ("gulp-rename");
var imageResize = require('gulp-image-resize');


gulp.task('imagemin', function () {
  return gulp.src('src/**/*.{png,jpg,svg}')

      .pipe(imagemin([
          imagemin.optipng({optimizationLevel: 3}),
          imagemin.jpegtran({progressive: true}),
          imagemin.svgo()
      ]))
      .pipe(gulp.dest('build'))
});

gulp.task('resize', function () {
  gulp.src('src/**/*.{png,jpg,svg}')
      .pipe(imageResize({
        width : 40,
        height : 325,
        crop: true
      }))
      .pipe(gulp.dest('build_new'));
});

gulp.task('new-name', function () {
  gulp.src('src/**/*.{png,jpg,svg}')
      .pipe(rename(function (path) {
        path.basename += "-Big";
      }))
      .pipe(gulp.dest('build_newName'));
});

gulp.task('clean', function () {
  return gulp.src('build')
      .pipe(clean())
});

gulp.task('build', function (callback) {
  run('clean', 'resize', callback);
});


