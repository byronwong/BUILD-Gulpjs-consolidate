
var gulp = require('gulp'),	// asks node to get the gulp library and assign to var
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee');


gulp.task('log', function(){ // can pick any name, here we use 'log'

	// enter the task you want to perform here...
	gutil.log('workflows are awesome'); // output info in console
});

gulp.task('coffeeTask', function(){

	var coffeeSource = {
		cfPath : 'components/coffee/tagline.coffee',
		output : 'components/scripts'
	};
	// gulp.src() takes string or array
	// use pipe to send target file to task in this case our coffee var
	// can pass in options as an object, check documentation to see what is available
	// add .on('error') so that if an error occurs it will not stop any other task
	// log out error in console using gutil
	// can use: *.js
	gulp.src(coffeeSource.cfPath)
		.pipe(coffee({bare:true})
			.on('error', gutil.log)
			.pipe(gulp.dest(coffeeSource.output))

		); 
});