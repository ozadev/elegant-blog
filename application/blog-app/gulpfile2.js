var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
// var ngmin = require('gulp-ngmin');


gulp.task('sass', function () {
  return gulp.src(['./assets/scss/scss/variables.scss', './assets/scss/scss/mixin.scss',  './assets/scss/scss/style.scss', './application/**/*.scss', '!./node_modules/**/*.scss'])
    .pipe(concat("style.scss"))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 16 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./assets/scss/'));
});

gulp.task('sass-min', function () {
  return gulp.src(['./assets/scss/scss/variables.scss', './assets/scss/scss/mixin.scss',  './assets/scss/scss/style.scss', './application/**/*.scss', '!./node_modules/**/*.scss'])
    .pipe(concat("style.min.scss"))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 16 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./assets/scss/'));
});

gulp.task('build', function () {
  return gulp.src(['./application/**/*.module.js', './application/**/*.js', '!./application/build.min.js', '!./application/build.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./application/'));
});

gulp.task('compress', function () {
  return gulp.src(['./application/**/*.module.js', './application/**/*.js', '!./application/build.min.js', '!./application/build.js'])
    .pipe(concat('build.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./application/'));
});

gulp.task('watch', function () {
  gulp.watch(['./**/*.scss', '!./node_modules/**/*.scss'], ['sass']);
  gulp.watch(['./application/**/*.js', '!./application/build.js'], ['build']);
});


gulp.task('default', ['sass', 'build', 'watch']);