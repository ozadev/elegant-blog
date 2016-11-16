var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var tinypng = require('gulp-tinypng-compress');
var autoprefixer = require('gulp-autoprefixer');
//var uglify = require('gulp-uglify');


gulp.task('default', ['sass', 'watch']);

gulp.task('sass', function () {
  return gulp.src('./css/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 16 versions'],
          cascade: false
        }))
      .pipe(concat("style.css"))
      .pipe(gulp.dest('./css'));
});

gulp.task('tinypng', function () {
  gulp.src('./img/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: 'UtR0VibHihT058f4Dbw-lakZ1lmLt2EN',
      sigFile: './img/.tinypng-sigs',
      log: true
    }))
    .pipe(gulp.dest('./img'));
});

//gulp.task('compress', function() {
//  gulp.src('./develop/js/*.js')
//    .pipe(concat('all.min.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest('./build/js'))
//});



gulp.task('watch', function () {
  gulp.watch('./css/sass/**/*.scss', ['sass']);
  //gulp.watch('./develop/js/*.js', ['compress']);
});