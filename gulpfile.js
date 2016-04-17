var gulp = require('gulp');
var compass = require('gulp-compass');

gulp.task('mobile_sass', function () {
    return gulp.src('./mobile/scss/*.scss')
        .pipe(compass({
            css: './mobile/styles',
            sass: './mobile/scss',
            image: './mobile/images',
            require: ['compass/import-once/activate'],
            style: 'compressed',
            sourcemap: true,
            task: 'compile'
        }))
        .pipe(gulp.dest('./mobile/styles'));
});

gulp.task('watch', function () {
    gulp.watch('./mobile/scss/*.scss', ['mobile_sass']);
});

gulp.task('default', ['mobile_sass', 'watch']);
