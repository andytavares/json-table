let gulp 		= require('gulp');
let concat 		= require('gulp-concat');
let ngAnnotate 	= require('gulp-ng-annotate');
let plumber 	= require('gulp-plumber');
let uglify 		= require('gulp-uglify');
let bytediff 	= require('gulp-bytediff');
let rename 		= require('gulp-rename');
let serve		= require('gulp-serve');
let livereload  = require('gulp-livereload');



gulp.task('concatjs', function() {
    return gulp.src(['src/jsonTable.module.js', 'src/**/*.js'])
	    .pipe(plumber())
			.pipe(concat('jsonTable.concat.js', {newLine: ';'}))
			.pipe(ngAnnotate({add: true}))
	    .pipe(plumber.stop())
        .pipe(gulp.dest('release/'));

});

gulp.task('buildjs', ['concatjs'], function() {
	return gulp.src('release/jsonTable.concat.js')
		.pipe(plumber())
			.pipe(bytediff.start())
				.pipe(uglify({mangle: true}))
			.pipe(bytediff.stop())
			.pipe(rename('jsonTable.min.js'))
		.pipe(plumber.stop())
		.pipe(gulp.dest('release/'))
		.pipe(livereload());
});

gulp.task('watch', ['buildjs'], function () {
	livereload.listen();
	gulp.watch('src/**/*.js', ['buildjs']);
});

gulp.task('default', ['watch', 'buildjs']);

gulp.task('serve', ['watch'], serve('.'));