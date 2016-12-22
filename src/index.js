/* global feature */
import 'feature.js'

import loader from './loader'

import './config'
import './util/disable-scroll'

if (feature.canvas && feature.webGL) {
	load()
} else {
	fallback()
}

function load() {

	let $bar = document.getElementById('loading__bar')

	loader.on('progress', (loaded) => {
		// console.log('loaded', loaded)

		// update progress
		$bar.style.width = `${loaded * 100}%`

	})

	loader.on('complete', () => {
		console.timeEnd('assets loading')

		require(['./app'], (App) => {
			window.app = new App.default()
		})

	})
	console.time('assets loading')

	loader.load()
}

function fallback() {
	document.getElementsByTagName('body')[0].className += ' not-supported'
}