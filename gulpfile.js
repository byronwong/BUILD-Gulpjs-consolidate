
var gulp = require('gulp'),	// asks node to get the gulp library and assign to var
	gutil = require('gulp-util');


gulp.task('log', function(){ // can pick any name, here we use 'log'

	// enter the task you want to perform here...
	gutil.log('workflows are awesome'); // output info in console
});