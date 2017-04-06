'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    runSequence = require('run-sequence'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/*.{sass,scss}',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.{sass,scss}',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
gulp.task('html:watch', function() {
    gulp.watch(path.watch.html, ['html:build']);
});

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

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'expanded',  // nested, expanded, compact, compressed
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        // .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});
gulp.task('style:watch', function() {
    gulp.watch(path.watch.style, ['style:build']);
});

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

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('fonts:watch', function() {
    gulp.watch(path.watch.fonts, ['fonts:build']);
});

gulp.task('watch', [
    'html:watch',
    'js:watch',
    'style:watch', 
    'fonts:watch', 
    'image:watch'
]);

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

function startDefault(cb) {
    runSequence(
        'clean',
        'build',
        'watch',
        'webserver', 
        cb
    );
}

gulp.task('default', function(cb) {
    startDefault(cb);
});