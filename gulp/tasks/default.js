var gulp = require('gulp');
var path = require('../path');
var runSequence = require('run-sequence');

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