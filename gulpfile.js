"use strict";

	var gulp = require("gulp"),
		connect = require("gulp-connect"),
		opn = require("opn"),
		autoprefixer = require("gulp-autoprefixer"),
		sass = require('gulp-sass');

// Запуск сервера с лайврелоадом
gulp.task('connect', function(){
	connect.server({
		root: 'app',
		livereload: true,
		port: 8888
	});
	opn('http://localhost:8888');
});

// Работа с html
gulp.task('html', function(){
	gulp.src('./app/*.html')
	.pipe(connect.reload());
});

// Работа с css 
gulp.task('css', function(){
	gulp.src('./sass/style.scss')
	.pipe(sass())
	.pipe(gulp.dest('./app/css/'))
	.pipe(autoprefixer('last 2 versions'))
	.pipe(connect.reload());
});

// Работа с js
gulp.task('js', function(){
	gulp.src('./app/js/*.js')
	.pipe(connect.reload());
});

// Слежка
gulp.task('watch', function(){
	gulp.watch(['./app/*.html'], ['html']);
	gulp.watch(['./sass/*.scss'], ['css']);
	gulp.watch(['./app/js/*.js'], ['js']);
});

// Задача по умолчанию
gulp.task('default', ['connect', 'watch']);