var gulp = require('gulp');
var browserSync = require("browser-sync");
var path = require('../path');
var rigger = require('gulp-rigger');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reload = browserSync.reload;

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger()) 
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});
gulp.task('js:watch', function() {
    gulp.watch(path.watch.js, ['js:build']);
});