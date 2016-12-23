/* global createjs */
import 'imports?this=>window!exports?window.createjs!soundjs'
import 'imports?this=>window!exports?window.createjs!preloadjs'
import EventEmitter from 'eventemitter3'

let manifest = [
	{id: 'vendor', src: 'js/vendor.js'},
	{id: 'jingle-bell', src: './assets/jingle-bell.mp3'},
	{id: 'ice', src: './assets/ice_texture.jpg'}
]

let modelList = [
	{id: 'ground', src: './assets/ground.obj', loader:'obj'},
	{id: 'tree', src: './assets/tree.obj', loader:'obj'},
	{id: 'splines', src: './assets/splines.dae', loader: 'collada'},
	{id: 'balls', src: './assets/balls.obj', loader: 'obj'}
]

let assets = {
	preload: {},
	model: {}
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

		let total = modelList.length
		let remaining = total
		let objLoader = new window.THREE.OBJLoader()
		let colladaLoader = new window.THREE.ColladaLoader()

		modelList.forEach((model) => {

			let loader = null

			if (model.loader == 'obj') {
				loader = objLoader
			}
			else if (model.loader == 'collada') {
				loader = colladaLoader
			}

			loader.load(model.src, (object) => {

				assets.model[model.id] = object

				remaining--

				let loaded = (preloadWeight + (1 - remaining / total) * objWeight) / totalWeight

				this.emit('progress', loaded)

				if (remaining == 0) {
					setTimeout(() => {
						this.emit('complete')
					}, 200)
				}

			})
		})
	}
}

window.assets = assets

export default new Loader()