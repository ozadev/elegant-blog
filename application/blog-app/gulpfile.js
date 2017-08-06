var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');

//
//
//

var sassSources = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    // './node_modules/normalize.css/normalize.css',
    './scss/style.scss',
    './app/**/*.scss'
];

var jsSources = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js',
    './node_modules/angular-animate/angular-animate.min.js',
    './node_modules/angular-sanitize/angular-sanitize.min.js',
    // './node_modules/angular-clipboard/angular-clipboard.js',
    // './node_modules/ng-file-upload/dist/ng-file-upload.min.js',
    // './node_modules/angular-scroll/angular-scroll.min.js',
    // './node_modules/ng-disable-scroll/disable-scroll.min.js',
    // './node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js',
    './app/app.module.js',
    './app/**/*.js'
];

//
//
//

gulp.task('build-sass', function () {
  return gulp.src(sassSources)
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 60 versions'],
          cascade: false
        }))
      .pipe(concat("style.css"))
      .pipe(gulp.dest('./../../public/assets/css/'));
});

gulp.task('build-sass-min', function () {
  return gulp.src(sassSources)
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 60 versions'],
          cascade: false
        }))
      .pipe(concat("style.min.css"))
      .pipe(gulp.dest('./../../public/assets/css/'));
});

gulp.task('build-js', function () {
    return gulp.src(jsSources)
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./../../public/app/'));
});

gulp.task('build-js-min', function () {
    return gulp.src(jsSources)
        .pipe(concat('build.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./../../public/app/'));
});

gulp.task('build-template', function () {
    return gulp.src('./app/**/*.html')
        .pipe(templateCache('template.js', {module: 'blogApp', root: '/app'}))
        .pipe(gulp.dest('./../../public/app/'));
});

gulp.task('build-template-min', function () {
    return gulp.src('./app/**/*.html')
        .pipe(templateCache('template.min.js', {module: 'blogApp', root: '/app'}))
        .pipe(uglify())
        .pipe(gulp.dest('./../../public/app/'));
});

gulp.task('watch', function () {
    gulp.watch(sassSources, ['build-sass']);
    gulp.watch(jsSources, ['build-js']);
    gulp.watch('./app/**/*html', ['build-template']);
});

gulp.task('build', ['build-sass', 'build-js', 'build-template']);
gulp.task('build-min', ['build-sass-min', 'build-js-min', 'build-template-min']);

gulp.task('default', ['build', 'watch']);