export default class CompositePass1 extends THREE.ShaderPass {

	constructor() {
		super({
			uniforms: {
				tDiffuse: {type: 't', value: null},
				tIce: {type: 't', value: new THREE.CanvasTexture(assets.preload['ice'])},
				resolution: {type: 'v2', value: new THREE.Vector2()},
				iceOffset: {type: 'v2', value: new THREE.Vector2()},
				effectIntensity: {type: 'f', value: 0},
				invert: {type: 'f', value: 0}
			},
			vertexShader: require('../shaders/basic-transform.vert'),
			fragmentShader: require('../shaders/composite1.frag')
		})

		this.frameCount = 0

		timeline.on('show-canvas', () => {
			new TWEEN.Tween(this.uniforms.effectIntensity)
				.to({value: 1}, 3000)
				.easing(TWEEN.Easing.Cubic.InOut)
				.start()
		})

		this.invert = false

		controller.on('invert', () => {

			this.invert = !this.invert

			let target = this.invert ? 1 : 0

			new TWEEN.Tween(this.uniforms.invert)
				.to({value: target}, 2000)
				.easing(TWEEN.Easing.Cubic.InOut)
				.start()
		})
	}

	setResolution(w, h) {
		this.uniforms.resolution.value.set(w, h)
	}

	update() {
		if (this.frameCount == 0) {
			this.uniforms.iceOffset.value.set(
				Math.random(),
				Math.random()
			)
		}

		this.frameCount = (this.frameCount + 1) % 4
	}

}