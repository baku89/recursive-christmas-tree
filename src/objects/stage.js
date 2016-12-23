// scene
// 	+- ground
//		+- surface
//		+- hole
// 	+- stage
// 			+- plate
// 			+- stem
// 			+- leafManager
// 					+- leaf...

class Stage extends THREE.Group {

	constructor() {
		super()

		let surfaceMat = new THREE.MeshBasicMaterial({
			color: Config.BG
		})

		// plate
		{
			let geom = assets.model.ground.children[1].geometry
			this.plate = new THREE.Mesh(geom, surfaceMat)
			this.add(this.plate)
		}

		// stem
		let tree = assets.model.tree
		{
			let geom = tree.children[1].geometry
			let mat = new THREE.MeshLambertMaterial({
				color: Config.STEM
			})
			this.stem = new THREE.Mesh(geom, mat)
			this.stem.visible = false
			this.add(this.stem)
		}

		// leaf parent
		this.leafManager = require('./leaf-manager.js').default
		this.leafManager.position.y = Config.LEAF_OFFSET_Y
		this.add(this.leafManager)

		// timeline
		timeline.on('show-tree', () => {

			let tw2 = new TWEEN.Tween(this.position)
				.to({y: 0}, 2000)
				.easing(TWEEN.Easing.Quadratic.Out)

			new TWEEN.Tween(this.position)
				.to({y: -40}, 2000)
				.easing(TWEEN.Easing.Quadratic.In)
				.onComplete(() => {
					this.leafManager.visible = true
					this.stem.visible = true
					tw2.start()
				})
				.start()
		})

		// delete
		controller.on('first-reset', () => {
			this.remove(this.plate, this.stem)
		})
	}
}

export default new Stage()