var gulp = require('gulp');
var path = require('../path');
var rimraf = require('rimraf');

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});