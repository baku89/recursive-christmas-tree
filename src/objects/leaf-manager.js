
import Leaf from './leaf'

let leafMatrix = new THREE.Matrix4()

let quat = new THREE.Quaternion()
quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Config.LEAF_ROT * 2)

leafMatrix.compose(
	new THREE.Vector3(0, Config.LEAF_Y, 0),
	quat,
	new THREE.Vector3(Config.LEAF_SCALE, Config.LEAF_SCALE, Config.LEAF_SCALE)
)

class LeafManager extends THREE.Group {

	constructor() {
		super()
		this.visible = false

		this.lastMatrix = new THREE.Matrix4()

		this.addInitialLeaves()

		controller.on('tap', this.addLeaf.bind(this))
	}

	addInitialLeaves() {

		// fadd initial leaves
		for (let i = 0; i < 4; i++) {
			let leaf = new Leaf()
			leaf.applyMatrix(this.lastMatrix)
			this.add(leaf)

			this.lastMatrix.multiply(leafMatrix)
		}
	}

	addLeaf() {

		let leaf = new Leaf()
		leaf.applyMatrix(this.lastMatrix)
		this.add(leaf)

		console.log('leaf', leaf.position.y)

		this.lastMatrix.multiply(leafMatrix)
	}
}

export default new LeafManager()