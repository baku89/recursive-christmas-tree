/* global gl */
import { device_pixel_ratio } from 'javascript-retina-detect'

import './gl'

import Composite1 from './post-effects/composite1'

export default class Canvas {

	constructor() {

		// initialization
		this.initScene()
		this.initPostprocessing()
		this.initController()
		this.resizeCanvas()

		// bind this
		this.onScroll = this.onScroll.bind(this)

		// add event
		$(window).on('resize', this.resizeCanvas.bind(this))

		// timeline
		timeline.on('show-canvas', () => {
			$('.canvas').addClass('show')
		})

		// controller
		controller.on('first-reset', () => {
			this.scene.remove(this.ground)
		})

		// start frame
		this.clock = new THREE.Clock()
		this.render = this.render.bind(this)
		this.render()
	}

	initScene() {
		this.scene = new THREE.Scene()
		// window.scene = this.scene

		// camera
		this.cameraRig = require('./camera-rig').default
		this.scene.add(this.cameraRig)

		this.ground = require('./objects/ground').default
		this.scene.add(this.ground)

		this.world = require('./objects/world').default
		this.scene.add(this.world)

		this.stage = require('./objects/stage').default
		this.scene.add(this.stage)

		gl.renderer.setClearColor(Config.BG)
		gl.renderer.setPixelRatio(device_pixel_ratio())
	}

	initPostprocessing() {

		this.renderPass = new THREE.RenderPass(this.scene, this.cameraRig.camera)

		// Add pass to effect composer
		this.composer = new THREE.EffectComposer(gl.renderer)
		this.composer.addPass(this.renderPass)

		this.composite1 = new Composite1()

		this.composer.addPass(this.composite1)

		this.composer.passes[this.composer.passes.length - 1].renderToScreen = true
	}

	initController() {
		controller.on('tap', () => {
			this.cameraRig.lift()
		})
	}

	resizeCanvas() {
		let w = window.innerWidth
		let h = window.innerHeight
		let aspect = w / h

		gl.renderer.setSize(w, h)
		this.cameraRig.setAspect(aspect)
		this.composite1.setResolution(w, h)
		this.composer.setSize(w, h)
	}

	onScroll(e) {
		this.cameraRig.scroll(e)
	}

	render() {

		requestAnimationFrame(this.render)

		TWEEN.update()

		this.cameraRig.update()

		if (Config.ENABLE_POSTEFFECTS) {
			this.composer.render()

		} else {

			gl.renderer.render(this.scene, this.cameraRig.camera)
		}
	}
}
