export default class CompositePass1 extends THREE.ShaderPass {

	constructor() {
		super({
			uniforms: {
				tDiffuse: {type: 't', value: null},
				tIce: {type: 't', value: new THREE.CanvasTexture(assets.preload['ice'])},
				resolution: {type: 'v2', value: new THREE.Vector2()},
				iceOffset: {type: 'v2', value: new THREE.Vector2()}
			},
			vertexShader: require('../shaders/basic-transform.vert'),
			fragmentShader: require('../shaders/composite1.frag')
		})

		this.frameCount = 0

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