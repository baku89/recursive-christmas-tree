
let treeMesh = new THREE.Mesh(
	assets.obj.tree.children[0].geometry,
	new THREE.MeshLambertMaterial({color: Config.LEAF})
)

export default class Leaf extends THREE.Group {

	constructor() {
		super()

		this.add(treeMesh.clone())

		// this.add(new THREE.AxisHelper(30))
	}
}