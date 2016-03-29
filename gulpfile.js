
// GULPFILE
// ========


// PACKAGES
// --------
var gulp = require('gulp'),	// asks node to get the gulp library and assign to var
	uglify = require('gulp-uglify'),
	browserify = require('gulp-browserify'),
	sass = require('gulp-ruby-sass'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	connect = require('gulp-connect');
	// Deprecated : gulp.src('components/sass/main.scss') = require('gulp-pumber');

	//gutil = require('gulp-util'), // loging system
	//coffee = require('gulp-coffee');
	//compass = require('gulp-compass'),



// Error Handling - instead of using plumber
var errorlog = function(){
	console.error.bind(console);
	this.emit('end'); // emitts end event that stops gulp from exiting/crashing
};



// TEMPLATE
/*
	gulp.task('[string: task name]', '[array: strings dependancy tasks]', callback function(){});
*/



// JS
// UGLIFY
// ------
gulp.task('uglify', function(){
	gulp.src('components/scripts/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest('builds/development/js/'));
});




// JS
// CONCAT
// ------
gulp.task('concat', ['uglify'], function(){
	
	// could use *.js
	var jsSource = [
		'components/scripts/script1.js',
		'components/scripts/script2.js'
		//'components/scripts/tagline.js'
	]; 

	gulp.src('builds/development/js/*.js')
		.pipe(plumber())
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js/'))
		.pipe(connect.reload());

});


// OR
// don't even need callback function.
// can add required tasks for the callback task to run
gulp.task('js', ['uglify', 'concat']); 






// CSS
// SASS Compile
// ------------
gulp.task('styles', function(){

	// Deprecated : gulp.src('components/sass/main.scss')
	return sass('components/sass/main.scss', {
		style: 'compressed',
	})
		//.on('error', console.log.bind(console)) // prevents gulp to exit watch if there is an error
		// OR
		.on('error', errorlog)
		.pipe(gulp.dest('builds/development/css/'))
		.pipe(connect.reload());
});



// HTML
gulp.task('html', function () {
  gulp.src('./builds/development/*.html')
    .pipe(connect.reload());
});


// SERVER
// ------

gulp.task('connect', function(){

	connect.server({
		root: 'builds/development/',
    	livereload: true
	});

});





// WATCH
gulp.task('watch', function(){

	// JS
	gulp.watch('components/scripts/*.js', ['concat']);

	// CSS
	gulp.watch('components/sass/*.scss',['styles']);

	// HTML
	gulp.watch('builds/development/*.html', ['html']);

});




// DEFAULT
// -------
gulp.task('default', ['concat','styles','connect','watch']);





// JS
// COFFEESCRIPT
// ------------ 
/*gulp.task('coffee', function(){

	var coffeeSource = {
		cfPath : 'components/coffee/tagline.coffee',
		output : 'components/scripts/'
	};
	// gulp.src() takes string or array
	// use pipe to send target file to task in this case our coffee var
	// can pass in options as an object, check documentation to see what is available
	// add .on('error') so that if an error occurs it will not stop any other task
	// log out error in console using gutil
	// can use: *.js
	gulp.src(coffeeSource.cfPath)
		.pipe(coffee({bare:true})
			.on('error', console.log))
		.pipe(gulp.dest(coffeeSource.output)
		); 
});*/




// JS CONCAT
// ---------





// COMPASS
// -------
/*gulp.task('compass', function(){

	var sassfiles = ['components/sass/main.scss']; // we only really need this main file, as it is importing

	// sass -- compass config.rb file
	gulp.src(sassfiles)
		.pipe(compass({
			sass: 'components/sass/',
			css: 'components/sass/',
			image: 'builds/development/images',
			style: 'compressed'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'));
});*/









