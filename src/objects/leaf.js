let treeMesh = new THREE.Mesh(
	assets.model.tree.children[0].geometry,
	new THREE.MeshLambertMaterial({color: Config.LEAF, wireframe: false})
)

treeMesh.scale.set(0, 0, 0)
treeMesh.position.y = 3

export default class Leaf extends THREE.Group {

	constructor() {
		super()

		this.tree = treeMesh.clone()
		this.tree.scale.set(0, 0, 0)

		new TWEEN.Tween(this.tree.scale)
			.to({x: 1, y: 1, z: 1}, 400)
			.easing(TWEEN.Easing.Cubic.Out)
			.start()

		new TWEEN.Tween(this.tree.position)
			.to({y: 0}, 400)
			.easing(TWEEN.Easing.Cubic.Out)
			.start()

		this.add(this.tree)

		// this.add(new THREE.AxisHelper(20))
	}
}