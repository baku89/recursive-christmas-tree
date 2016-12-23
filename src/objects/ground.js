class Ground extends THREE.Object3D {

	constructor() {
		super()

		let surfaceMat = new THREE.MeshBasicMaterial({
			color: Config.BG
		})

		let model = assets.model.ground

		// surface
		{
			let geom = model.children[0].geometry
			let mesh = new THREE.Mesh(geom, surfaceMat)
			this.add(mesh)
		}

		// hole
		{
			let geom = model.children[2].geometry
			let mat = new THREE.MeshLambertMaterial({
				color: 0x95c4dc,
				emissive: 0x1a3c8c
			})
			let mesh = new THREE.Mesh(geom, mat)
			this.add(mesh)
		}
	}
}

export default new Ground()