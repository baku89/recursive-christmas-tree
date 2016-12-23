export default class CompositePass0 extends THREE.ShaderPass {

	constructor() {
		super({
			uniforms: {
				tDiffuse: {type: 't', value: null},
				resolution: {type: 'v2', value: new THREE.Vector2()}
			},
			vertexShader: require('../shaders/basic-transform.vert'),
			fragmentShader: require('../shaders/composite0.frag')
		})

	}

	setResolution(w, h) {
		this.uniforms.resolution.value.set(w, h)
	}

}