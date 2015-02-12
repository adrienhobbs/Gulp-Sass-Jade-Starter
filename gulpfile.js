var gulp        = require('gulp'),
    jade        = require('gulp-jade'),
    notify      = require('gulp-notify'),
    sass        = require('gulp-ruby-sass'),
    livereload  = require('gulp-livereload'),
    browserify  = require('gulp-browserify'),
    rename      = require('./node_modules/gulp-rename'),
    uglify      = require('./node_modules/gulp-uglifyjs'),
    jadeDir     = "partials",
    sassDir     = './sass',
    homeDir     = "./",
    jsDir       = "js",
    shell       = require('gulp-shell'),
    argv        = require('yargs').argv;

gulp.task('push',
shell.task(['echo git add -A && git commit -m "' + argv.m + '" && git push'])
);

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

gulp.task('js', function(){
    gulp.src('js/app.js')
        .pipe(browserify())
        .pipe(rename('/bundle.js'))
        .pipe(gulp.dest('./js'))
});

gulp.task('uglify', function() {
  gulp.src('js/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'))
});

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch(jadeDir + "/**/*.jade", ['jade']);
  gulp.watch(sassDir + "/**/*.scss", ['sass']);
  gulp.watch(jsDir + "/**/*.js", ['js']);
  gulp.watch(jsDir + "/**/*.js").on('change', function(file) {
      server.changed(file.path);
  });
});

gulp.task('serve', ['jade','js', 'sass', 'watch']);