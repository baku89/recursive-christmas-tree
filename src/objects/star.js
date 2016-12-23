

export default class Star extends THREE.Mesh {

	constructor() {

		let geom = assets.model.tree.children[2].geometry
		let mat = new THREE.MeshLambertMaterial({
			color: 0xEAED6A,
			emissive: 0xdb6f27
		})

		super(geom, mat)
	}
}