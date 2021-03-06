var jadeDir     = "partials",
    sassDir     = './sass',
    homeDir     = "./",
    jsDir       = "js",
    gulp        = require('gulp'),
    jade        = require('gulp-jade'),
    notify      = require('gulp-notify'),
    sass        = require('gulp-ruby-sass'),
    livereload  = require('gulp-livereload'),
    browserify  = require('gulp-browserify'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglifyjs'),
    shell       = require('gulp-shell'),
    argv        = require('yargs').argv;





gulp.task('push', shell.task(['git add -A && git commit -m "' + argv.m + '" && git push']));

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
        .pipe(notify('JS has been bundled.'));
});

gulp.task('uglify', function() {
  gulp.src('js/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('js'))
});

gulp.task('watch', function() {
  var server = livereload();

  gulp.watch(jadeDir + "/**/*.jade", ['jade']).on('change', function(file) {
      server.changed(file.path);
  });

  gulp.watch(sassDir + "/**/*.scss", ['sass']).on('change', function(file) {
      server.changed(file.path);
  });

  gulp.watch(jsDir + "/**/*.js", ['js']).on('change', function(file) {
      server.changed(file.path);
  });

  gulp.watch(jsDir + "/**/*.js").on('change', function(file) {
      server.changed(file.path);
  });
});

gulp.task('serve', ['jade','js','uglify','sass', 'watch']);