var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('server', function () {
    server.run(['app/app.js']);
    
    gulp.watch(['app/**/*'], [server.run]);
});
