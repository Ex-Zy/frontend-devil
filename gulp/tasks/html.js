var gulp = require('gulp');
var path = require('../path');
var rigger = require('gulp-rigger');
var browserSync = require("browser-sync");
var reload = browserSync.reload;

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
gulp.task('html:watch', function() {
    gulp.watch(path.watch.html, ['html:build']);
});