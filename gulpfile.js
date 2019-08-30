'use scrict';

let gulp = require('gulp'),
    gp = require('gulp-load-plugins')();
    browserSync = require('browser-sync').create();

    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: "./build"
            }
        });
        
    });

gulp.task('pug', function() {
    return gulp.src('src/pug/pages/*.pug')
    .pipe(gp.pug({
        pretty:true
    }))
    .pipe(gulp.dest('build'))
    .on('end', browserSync.reload)
})

gulp.task('stylus', function() {
    return gulp.src('src/static/stylus/main.styl')
    .pipe(gp.stylus({ }))
    .pipe(gp.autoprefixer())
    .on("error", gp.notify.onError({
        message: "Error: <%= error.message %>",
        title: "stylus"
      }))
    .pipe(gp.sourcemaps.write())
    .pipe(gp.csso())
    .pipe(gulp.dest('build/static/css/'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('watch', function () {
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'))
    gulp.watch('src/static/stylus/**/*.styl', gulp.series('stylus'))
})

gulp.task('default', gulp.series(
    gulp.parallel('pug', 'stylus'),
    gulp.parallel('watch', 'browser-sync')
))