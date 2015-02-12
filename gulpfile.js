var gulp = require('gulp'),
    jade = require('gulp-jade'),
    notify = require('gulp-notify'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),
    jadeDir = "partials",
    sassDir = './sass',
    homeDir = "./",
    jsDir   = "js";

gulp.task('jade', function () {
  return gulp.src(jadeDir + "/**/*.jade")
      .pipe(jade())
      .pipe(gulp.dest(homeDir))
      .pipe(livereload())
    .pipe(notify('Jade has been compiled. '));
});

gulp.task('sass', function() {
    return sass("./sass")
        .pipe(gulp.dest('css'))
        .pipe(notify('Sass has been compiled.'));
});

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch(jadeDir + "/**/*.jade", ['jade']);
  gulp.watch(sassDir + "/**/*.scss", ['sass']);
  gulp.watch(jsDir + "/**/*.js").on('change', function(file) {
      server.changed(file.path);
  });
});

gulp.task('serve', ['jade', 'sass', 'watch']);