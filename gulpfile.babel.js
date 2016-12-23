/* global process */

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const webpack = require('webpack')
const WebpackStream = require('webpack-stream')
const BrowserSync = require('browser-sync')
const runSequence = require('run-sequence')
const browserSync = BrowserSync.create()

let developmentMode = true

process.env.NODE_ENV = 'dev'

function requireUncached($module) {
	delete require.cache[require.resolve($module)]
	return require($module)
}

//==================================================
gulp.task('webpack', () => {
	let config = require('./webpack.config.js')

	// modify conig
	if (developmentMode) {
		config.devtool = 'inline-source-map'
		config.watch = true
	} else {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin()
		)
	}

	return gulp.src('')
		.pipe($.plumber())
		.pipe(WebpackStream(config))
		.pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream())
})

//==================================================

gulp.task('pug', () => {
	return gulp.src('./src/*.pug')
		.pipe($.plumber())
		.pipe($.data(() => {
			return requireUncached('./src/pug/data.json')
		}))
		.pipe($.pug({pretty: developmentMode}))
		.pipe(gulp.dest('public'))
		.pipe(browserSync.stream())
})

//==================================================
gulp.task('stylus', () => {
	return gulp.src('./src/stylus/style.styl')
		.pipe($.plumber())
		.pipe($.stylus({use: [require('nib')(), require('svg-stylus')()]}))
		.pipe($.autoprefixer())
		.pipe($.if(!developmentMode, $.combineMq()))
		.pipe($.if(!developmentMode, $.minifyCss()))
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.stream())
})

//==================================================
gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: './public'
		},
		open: true
	})
})

//==================================================
gulp.task('watch', () => {
	gulp.watch('./src/**/*.styl', ['stylus'])
	gulp.watch(['./src/*.pug', './src/pug/*'], ['pug'])
})

//==================================================
gulp.task('release', () => {
	developmentMode = false
	process.env.NODE_ENV = 'production'
})

//==================================================
gulp.task('move', () => {
	return gulp.src('./public/**/*')
		.pipe(gulp.dest('../app/final_site/app/xps/2016/23/recursive-christmas-tree'))	
})

//==================================================

gulp.task('default', ['webpack', 'pug', 'stylus', 'watch', 'browser-sync'])
gulp.task('build', () => {
	runSequence(
		'release',
		['pug', 'stylus', 'webpack'],
		'move'
	)
})
