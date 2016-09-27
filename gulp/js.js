var gulp = require('gulp');
var ngAnnotate = require ('gulp-ng-annotate');
var inject = require('gulp-inject');

gulp.task('js:build', function () {
	gulp.src(['./ng/**/module.js', './ng/**/*.js'])
	.pipe(ngAnnotate())
	.pipe(gulp.dest('./static/js'));

	var target = gulp.src('./static/index.html');

	var sources = gulp.src(['./static/js/module.js', './static/js/**/*.js'], {read: false});

	return target.pipe(inject(sources, {ignorePath: 'static'}))
	.pipe(gulp.dest('./static/'));
});

gulp.task('js:watch', ['js:build'], function(){
  gulp.watch('/.ng/**/*.js', ['js:build']);
});
