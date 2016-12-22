/* global createjs */
import 'imports?this=>window!exports?window.createjs!soundjs'
import 'imports?this=>window!exports?window.createjs!preloadjs'
import EventEmitter from 'eventemitter3'

let manifest = [
	{id: 'vendor', src: 'js/vendor.js'},
	{id: 'jingle-bell', src: './assets/jingle-bell.mp3'}
]

let objList = {
	ground: './assets/ground.obj',
	tree: './assets/tree.obj'
}

let assets = {
	preload: {},
	obj: {}
}

let preloadWeight = 1.0
let objWeight = 0.4

let totalWeight = preloadWeight + objWeight

class Loader extends EventEmitter {

	constructor() {
		super()

		this.preload = new createjs.LoadQueue()
		this.preload.installPlugin(createjs.Sound)
		this.preload.setMaxConnections(10)
		this.preload.loadManifest(manifest, false)
		this.preload.on('complete', this.onCompletePreload.bind(this))

		this.preload.on('progress', (e) => {
			let loaded = (e.loaded * preloadWeight) / totalWeight
			this.emit('progress', loaded)
		})
	}

	load() {
		console.log('loading assets...')
		this.preload.load()
	}

	onCompletePreload() {

		manifest.forEach((m) => {
			assets.preload[m.id] = this.preload.getResult(m.id)
		})
		this.loadObj()
	}

	loadObj() {
		// load OBJ
		console.log('loading obj...')

		let total = Object.keys(objList).length
		let remaining = total
		let objLoader = new window.THREE.OBJLoader()

		for (let key in objList) {

			let path = objList[key]

			objLoader.load(path, (obj) => {
				assets.obj[key] = obj

				let loaded = (preloadWeight + (remaining / total) * objWeight) / totalWeight

				this.emit('progress', loaded)

				if (--remaining == 0) {
					this.emit('complete')
				}
			})

		}

	}
}

window.assets = assets

export default new Loader()