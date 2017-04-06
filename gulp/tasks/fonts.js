var gulp = require('gulp');
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var path = require('../path');

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('fonts:watch', function() {
    gulp.watch(path.watch.fonts, ['fonts:build']);
});