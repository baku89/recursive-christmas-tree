class Snow extends THREE.Points {

	constructor() {
		let geom = new THREE.BufferGeometry()
		{
			let num = 300
			let positions = new Float32Array(num * 3)
			let sizes = new Float32Array(num)
			let timeOffsets = new Float32Array(num)
			let timeScales = new Float32Array(num)

			for (let i = 0, i3 = 0; i < num; i++, i3 += 3) {
				let radius = THREE.Math.randFloat(30, 120)
				let angle = THREE.Math.randFloat(0, 360) / 180 * Math.PI
				positions[i3    ] = radius * Math.cos(angle)
				positions[i3 + 1] = THREE.Math.randFloat(-20, 40)
				positions[i3 + 2] = radius * Math.sin(angle)

				sizes[i] = THREE.Math.randFloat(30, 80)
				
				timeOffsets[i] = Math.random() * .05
				timeScales[i]  = THREE.Math.randFloat(1, 2)
			}

			geom.addAttribute('position', new THREE.BufferAttribute(positions, 3))
			geom.addAttribute('size', new THREE.BufferAttribute(sizes, 1))
			geom.addAttribute('timeOffset', new THREE.BufferAttribute(timeOffsets, 1))
			geom.addAttribute('timeScale', new THREE.BufferAttribute(timeScales, 1))
		}

		let mat = new THREE.ShaderMaterial({
			uniforms: {
				time: {value: 0}
			},
			vertexShader: require('../shaders/snow.vert'),
			fragmentShader: require('../shaders/snow.frag'),
			depthTest: false,
			transparent: true
		})

		super(geom, mat)

		this.uniforms = mat.uniforms
	}

	animate() {
		this.uniforms.time.value = 0

		new TWEEN.Tween(this.uniforms.time)
			.to({value: 2.05}, 12000)
			.start()
	}
}

export default new Snow()