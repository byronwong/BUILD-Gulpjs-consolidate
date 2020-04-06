
Setup
=====

Gulp
----

	Requires Node:

	npm install -g gulp

	in project folder:

		npm install --save-dev gulp

	then create gulpfile.js --> see gulp file for additional notes

	npm install --save-dev gulp-util	// log plugin
	npm install --save-dev gulp-coffee

	to run tasks use:

		gulp [task name]




Browserify
----------

	npm install -g browserify
	
	npm install --save-dev gulp-browserify
		
	npm install --save jquery

	npm install --save mustache

	// you can add dependancies to a js file by using:

	var myVar = require('moduleName');	
	var	$ = require('jquery'); 

	By adding this browserify with automatically include this dependancy, you can even do this in you nomarl js files, such as including jquery.



	


Sass
----

	ruby --version

	gem update	

	gem install sass

	gem install compass

	npm install --save-dev gulp-compass

	(creating a config.rb file ?)


Compass
-------
	gem list	// returns all gems

	gem install compass



	
NPM
---
	npm init --> setup package.json




Git
---

	Create .gitignore
	
	Create new repository on github

Bower
-----

	npm install -g bower

Then in root dir

	bower init

	bower install // gets all required packages

	bower install jquery --save

	bower install jquery angular backbone --save  // installs all 3

	bower list // returns everything you have installed via bower

	bower list --paths	// returns package paths

	bower uninstall PACKAGE --save


Commands
========

	pwd --> returns file path

	ls / dir --> list files

	clear / cls --> clear the console


