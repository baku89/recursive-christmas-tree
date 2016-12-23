/* global gl */
import { device_pixel_ratio } from 'javascript-retina-detect'

import './gl'

export default class Canvas {

	constructor() {

		// initialization
		this.initScene()
		this.initPass()
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

	initPass() {

		this.renderPass = new THREE.RenderPass(this.scene, this.cameraRig.camera)

		this.depthMaterial = new THREE.MeshDepthMaterial()
		this.depthMaterial.depthPacking = THREE.RGBADepthPacking
		this.depthMaterial.blending = THREE.NoBlending

		let params = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter
		}
		this.depthRenderTarget = new THREE.WebGLRenderTarget(
			window.innerWidth, window.innerHeight, params)

		// Setup SSAO Pass
		this.ssaoPass = new THREE.ShaderPass(THREE.SSAOShader)
		this.ssaoPass.renderToScreen = true
		this.ssaoPass.uniforms['tDepth'].value = this.depthRenderTarget.texture
		this.ssaoPass.uniforms['size'].value.set(window.innerWidth, window.innerHeight)
		this.ssaoPass.uniforms['cameraNear'].value = this.cameraRig.camera.near
		this.ssaoPass.uniforms['cameraFar'].value = this.cameraRig.camera.far
		this.ssaoPass.uniforms['onlyAO'].value = false
		this.ssaoPass.uniforms['aoClamp'].value = 0.1

		this.ssaoPass.uniforms['lumInfluence'].value = 1.0

		// Add pass to effect composer
		this.effectComposer = new THREE.EffectComposer(gl.renderer)
		this.effectComposer.addPass(this.renderPass)
		this.effectComposer.addPass(this.ssaoPass)
	}

	initController() {
		controller.on('tap', () => {
			this.cameraRig.lift()
		})
	}

	resizeCanvas() {
		let w = window.innerWidth
		let h = window.innerHeight

		gl.renderer.setSize(w, h)
		this.cameraRig.setAspect(w / h)
		this.ssaoPass.uniforms['size'].value.set(w, h)
		this.depthRenderTarget.setSize(w, h)
		this.effectComposer.setSize(w, h)
	}

	onScroll(e) {
		this.cameraRig.scroll(e)
	}

	render() {

		requestAnimationFrame(this.render)

		TWEEN.update()

		this.cameraRig.update()

		if (Config.ENABLE_AO) {

			// Render depth into depthRenderTarget
			this.scene.overrideMaterial = this.depthmaterial
			gl.renderer.render(
				this.scene,
				this.cameraRig.camera,
				this.depthRenderTarget,
				true)

			// Render renderPass and SSAO shaderPass
			this.scene.overrideMaterial = null
			this.effectComposer.render()

		} else {

			gl.renderer.render(this.scene, this.cameraRig.camera)
		}
	}
}
