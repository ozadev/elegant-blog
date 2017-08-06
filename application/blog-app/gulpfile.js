var gulp = require('gulp');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var tinypng = require('gulp-tinypng-compress');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var templateCache = require('gulp-angular-templatecache');

//
//
//

// Main dashboard application

var appSassSources = [
    './node_modules/normalize.css/normalize.css',
    './app/**/*.scss',
    './scss/style.scss'
];

var appJsSources = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js',
    './node_modules/angular-animate/angular-animate.min.js',
    './node_modules/angular-sanitize/angular-sanitize.min.js',
    './node_modules/angular-clipboard/angular-clipboard.js',
    './node_modules/ng-file-upload/dist/ng-file-upload.min.js',
    './node_modules/angular-scroll/angular-scroll.min.js',
    './node_modules/ng-disable-scroll/disable-scroll.min.js',
    './node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js',
    './app/app.module.js',
    './app/**/*js'
];

// Admin dashboard application

var adminSassSources = [
    './node_modules/normalize.css/normalize.css',
    './appAdmin/**/*.scss',
    './scss/styleAdmin.scss'
];

var adminJsSources = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js',
    './node_modules/angular-animate/angular-animate.min.js',
    './node_modules/angular-sanitize/angular-sanitize.min.js',
    './node_modules/angular-clipboard/angular-clipboard.js',
    './appAdmin/app.module.js',
    './appAdmin/**/*js'
];


//
//
//

gulp.task('app-sass', function () {
  return gulp.src(appSassSources)
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 60 versions'],
          cascade: false
        }))
      .pipe(concat("style.css"))
      .pipe(gulp.dest('./../public/assets/css/'));
});


gulp.task('admin-sass', function () {
    return gulp.src(adminSassSources)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 60 versions'],
            cascade: false
        }))
        .pipe(concat("styleAdmin.css"))
        .pipe(gulp.dest('./../public/assets/css/'));
});

gulp.task('app-sass-min', function () {
  return gulp.src(appSassSources)
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 60 versions'],
          cascade: false
        }))
      .pipe(concat("style.min.css"))
      .pipe(gulp.dest('./../public/assets/css/'));
});

gulp.task('app-build', function () {
    return gulp.src('./app/**/*html')
        .pipe(templateCache('template.js', {module: 'App', root: '/app'}))
        .pipe(addsrc(appJsSources))
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./../public/app/'));
});

gulp.task('admin-build', function () {
    return gulp.src(adminJsSources)
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./../public/appAdmin/'));
});


gulp.task('app-compress', function () {
    return gulp.src('./app/**/*html')
        .pipe(templateCache('template.js', {module: 'App', root: '/app'}))
        .pipe(addsrc(appJsSources))
        .pipe(concat('build.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./../public/app/'));
});


gulp.task('admin-template', function () {
    return gulp.src(['./appAdmin/**/*.html'], {base:"./appAdmin"})
        .pipe(gulp.dest('./../public/appAdmin/'));
});

gulp.task('app-watch', function () {
    gulp.watch(appSassSources, ['app-sass']);
    gulp.watch([appJsSources, './app/**/*html'], ['app-build']);
});

gulp.task('admin-watch', function () {
    gulp.watch(adminSassSources, ['admin-sass']);
    gulp.watch(adminJsSources, ['admin-build']);
    gulp.watch(['./appAdmin/**/*.html'], ['admin-template']);
});


gulp.task('build', ['app-sass', 'app-build', 'admin-sass', 'admin-build', 'admin-template']);

gulp.task('app', ['app-sass', 'app-build', 'app-watch']);
gulp.task('admin', ['admin-sass', 'admin-build', 'admin-template', 'admin-watch']);

gulp.task('default', ['app', 'admin']);