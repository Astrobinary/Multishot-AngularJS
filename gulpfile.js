var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('nodemon');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

gulp.task('server', function () {
	nodemon({
		script: 'app/server/app.js',
		ext: ['js', 'scss'],
		ignore: ["app/streams/controller.js"]
	}).on('restart', function () {
		gulp.src('app/server/app.js')
			.pipe(livereload());
	});
});

gulp.task('styles', function () {
	livereload.listen();
	gulp.src('app/client/scss/*.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('app/client/css/'))
		.pipe(livereload());
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('app/client/scss/*.scss', ['styles']);
	gulp.watch("app/client/*.html").on('change', livereload.reload);
	gulp.watch("app/client/**/*.js").on('change', livereload.reload);

});

gulp.task('dev', ['server', 'styles', 'watch']);
