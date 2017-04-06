var gulp = require('gulp');
var path = require('../path');

gulp.task('watch', [
    'html:watch',
    'js:watch',
    'style:watch', 
    'fonts:watch', 
    'image:watch'
]);