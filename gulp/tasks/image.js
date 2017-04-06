var gulp = require('gulp');
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var path = require('../path');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});
gulp.task('image:watch', function() {
    gulp.watch(path.watch.img, ['image:build']);
});