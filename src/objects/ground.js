class Ground extends THREE.Object3D {

	constructor() {
		super()

		let surfaceMat = new THREE.MeshBasicMaterial({
			color: Config.BG
		})

		let obj = assets.obj.ground

		// surface
		{
			let geom = obj.children[0].geometry
			let mesh = new THREE.Mesh(geom, surfaceMat)
			this.add(mesh)
		}

		// hole
		{
			let geom = obj.children[2].geometry
			let mat = new THREE.MeshLambertMaterial({
				color: Config.BG
			})
			let mesh = new THREE.Mesh(geom, mat)
			this.add(mesh)
		}
	}
}

export default new Ground()