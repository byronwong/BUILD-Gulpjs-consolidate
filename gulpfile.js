
// GULPFILE
// ========

// PACKAGES
// --------
var gulp = require('gulp'),	// asks node to get the gulp library and assign to var
	uglify = require('gulp-uglify'),
	//minify = require('gulp-minify'),
	minifyHTML = require('gulp-minify-html'),
	browserify = require('gulp-browserify'),
	sass = require('gulp-ruby-sass'),
	concat = require('gulp-concat'),
	//plumber = require('gulp-plumber'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if');

	//gutil = require('gulp-util'), // loging system
	//coffee = require('gulp-coffee');
	//compass = require('gulp-compass'),
	// Image Compression:gulp-imagemin + imagemin-pngcrush


// ENVIRONMENTS & OTHER VARIABLES
// ------------------------------
// Switching from dev to production using environment variables via node
// https://nodejs.org/api/process.html#process_process_env
// Check to see if environment var is setup if not create 'development'
var 
	// CSS format style when compiled
	cssFormat,
	
	// Base output paths
	devPath = './builds/development/',
	prodPath = './builds/production/',

	// Deploy Environment Setting Variable
	env = process.env.NODE_ENV || 'development',

	// Modifies output path depending on environment variable
	// To change to production:
	// NODE_ENV=production gulp
	// NOTE: windows try set NODE_ENV=production gulp
	// If not change the default
	outputPath = (function(){

		if (env === 'development'){
			cssFormat = 'expanded';
			return devPath;
		} else if (env === 'production'){
			cssFormat = 'compressed';
			return prodPath;
		}

	}());


// RESULTING PATHS
// ---------------
// COMPONENTS (INPUT)
var 
	inputPathHTML, // Add html folder
	inputPathIndex = './builds/development/*.html', // can change to inputPathHTML for html folder
	inputPathSASS = './components/sass/*.scss',
	inputPathJS = './components/scripts/*.js',

	inputPathJSON = './builds/development/js/*.json', // can remove
	
	compPathMainSASS = './components/sass/main.scss',
	
// OUTPUT --> ./builds/<outputPath>/
	outputRoot = outputPath,
	outputPathHTML =  outputPath, // add HTML folder path
	outputPathIndex = outputPath, 
	outputPathCSS = outputPath + 'css/',

	outputPathJS = outputPath + '/js',
	outputPathJSON =  outputPath + 'js/'; // can remove



// REUSEABLE Functions
// -------------------

// Error Handling - instead of using plumber
// ALT: .on('error', console.log.bind(console)) // prevents gulp to exit watch if there is an error
var errorlog = function(){
	console.error.bind(console);
	this.emit('end'); // emitts end event that stops gulp from exiting/crashing
};



// GULP TEMPLATES NOTES
// --------------------
	// gulp.task('[string: task name]', '[array: strings dependancy tasks]', callback function(){});
	// don't even need callback function.
	// can add required tasks for the callback task to run:
	// gulp.task('js', ['uglify', 'concat']); 



// JS
// CONCAT
// ------
gulp.task('concatJS', function(){
	
	return gulp.src(inputPathJS)
		//.pipe(plumber())
		.pipe(concat('script.js'))
		.on('error', errorlog)
		.pipe(gulpif( env === 'production', uglify()))
		.pipe(gulp.dest(outputPathJS))
		.pipe(connect.reload());
});


// CSS
// SASS Compile
// ------------
gulp.task('compileSASS', function(){

	// Deprecated : gulp.src('components/sass/main.scss')
	return sass(inputPathSASS, {
		style: cssFormat,
	})
		.on('error', errorlog)
		.pipe(gulp.dest(outputPathCSS))
		.pipe(connect.reload());
});


// HTML
gulp.task('updateHTML', function () {

  return gulp.src(inputPathIndex)
  	.pipe(gulpif(env === 'production', minifyHTML()))
  	.pipe(gulp.dest(outputPathIndex))
    .pipe(connect.reload());
});


// JSON
// Reloads page when file type is updated
gulp.task('updateJSON', function () {

  return gulp.src(inputPathJSON)
  	.pipe(gulp.dest(outputPathJSON))
    .pipe(connect.reload());
});


// SERVER
// ------
// Setup a local server to run live reloads
gulp.task('connect', function(){

	connect.server({
		root: outputRoot,
    	livereload: true,
    	port:8000
	});

});


// WATCH
gulp.task('watch', function(){

	// JS
	gulp.watch(inputPathJS, ['concatJS']);

	// CSS
	gulp.watch( inputPathSASS,['compileSASS']);

	// HTML
	gulp.watch( inputPathIndex, ['updateHTML']);

	// JSON
	gulp.watch( inputPathJSON, ['updateJSON']);

});


// DEFAULT
// -------
gulp.task('default', ['concatJS', 'compileSASS', 'updateHTML', 'updateJSON', 'connect', 'watch']);














// JS
// UGLIFY
// ------
// gulp.task('uglify', function(){
// 	return gulp.src('components/scripts/*.js')
// 	.pipe(plumber())
// 	.pipe(uglify())
// 	.pipe(gulp.dest('builds/development/js/'));
// });


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









