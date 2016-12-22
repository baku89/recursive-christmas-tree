
import Leaf from './leaf'

let leafMatrix = new THREE.Matrix4()

let quat = new THREE.Quaternion()
quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Config.LEAF_ROT)

leafMatrix.compose(
	new THREE.Vector3(0, Config.LEAF_Y, 0),
	quat,
	new THREE.Vector3(Config.LEAF_SCALE, Config.LEAF_SCALE, Config.LEAF_SCALE)
)

class LeafManager extends THREE.Group {

	constructor() {
		super()
		this.visible = false

		this.newMatrix = new THREE.Matrix4()

		this.addInitialLeaves()

		controller.on('tap', this.addLeaf.bind(this))
		controller.on('reset', this.reset.bind(this))
	}

	addInitialLeaves() {

		// add initial leaves
		let leaf

		for (let i = 0; i < 4; i++) {
			leaf = new Leaf()
			leaf.applyMatrix(this.newMatrix)
			this.add(leaf)
			this.newMatrix.multiply(leafMatrix)
		}

		this.originalMatrix = leaf.matrix.clone()
		console.log(this.originalMatrix.elements)
	}

	addLeaf() {
		console.log(this.originalMatrix.elements)

		let leaf = new Leaf()
		leaf.applyMatrix(this.newMatrix)
		this.add(leaf)

		this.newMatrix.multiply(leafMatrix)
	}

	reset() {

		let resetMat = new THREE.Matrix4().getInverse(this.newMatrix)
		resetMat = resetMat.multiply(this.originalMatrix)

		this.children.forEach((leaf) => {
			leaf.applyMatrix(resetMat)
		})

		this.newMatrix = this.originalMatrix.clone()
	}
}

export default new LeafManager()