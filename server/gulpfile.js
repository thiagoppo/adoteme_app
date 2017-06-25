var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('server', function () {
    server.run(['app/app.js']);

    // Restart the server when file changes
    gulp.watch(['app/app.js'], [server.run]);
    gulp.watch(['app/**/*.js'], [server.run]);
});
