
import Leaf from './leaf'
import MovingLeaves from './moving-leaves'
import Star from './star'

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

		// 0 is star
		this.star = new Star()
		this.add(this.star)

		// 1 is snow
		this.snow = require('./snow').default
		this.add(this.snow)

		this.addInitialLeaves()

		controller.on('tap', this.addLeaf.bind(this))
		controller.on('reset', this.reset.bind(this))
		controller.on('snow', () => {
			let pos = new THREE.Vector3(),
				quat = new THREE.Quaternion(),
				scale = new THREE.Vector3()
			this.newMatrix.decompose(pos, quat, scale)
			this.snow.position.copy(pos)
			this.snow.scale.copy(scale)
			this.snow.animate()
		})
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
		this.star.position.copy(new THREE.Vector3(0, 15, 0).applyMatrix4(leaf.matrix))
	}

	addLeaf(type) {
		let leaf = new MovingLeaves[type]()
		leaf.applyMatrix(this.newMatrix)

		this.add(leaf)
		this.newMatrix.multiply(leafMatrix)

		// make the star jump

		let sp = this.star.position
		let ny = new THREE.Vector3(0, 15, 0).applyMatrix4(leaf.matrix).y
		let ty = sp.y + 15 * leaf.matrix.getMaxScaleOnAxis()

		let ns = this.star.scale.x * Config.LEAF_SCALE
		this.star.scale.set(ns, ns, ns)

		if (this.starTween) {
			this.starTween.stop()
		}

		this.starTween = new TWEEN.Tween(sp)
			.to({y: ty}, 100)
			.easing(TWEEN.Easing.Cubic.Out)
			.onComplete(() => {
				this.starTween = new TWEEN.Tween(sp)
				.to({y: ny}, 500)
				.easing(TWEEN.Easing.Bounce.Out)
				.start()
			})
			.start()


	}

	reset() {

		let resetMat = new THREE.Matrix4().getInverse(this.newMatrix)
		resetMat = resetMat.multiply(this.originalMatrix)

		let pos = new THREE.Vector3()
		let quat = new THREE.Quaternion()
		let scale = new THREE.Vector3()

		resetMat.decompose(pos, quat, scale)
		resetMat.compose(pos, new THREE.Quaternion(), scale)
		
		this.children.forEach((leaf) => {
			leaf.applyMatrix(resetMat)
		})

		this.star.rotation.y = 0

		this.newMatrix = this.newMatrix.multiply(resetMat)

		controller.emit('reset-matrix', resetMat)
	}
}

export default new LeafManager()