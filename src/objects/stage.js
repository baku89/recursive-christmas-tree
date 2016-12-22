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
			let geom = assets.obj.ground.children[1].geometry
			this.stage = new THREE.Mesh(geom, surfaceMat)
			this.add(this.stage)
		}

		// stem
		let tree = assets.obj.tree
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
				.to({y: -34}, 2000)
				.easing(TWEEN.Easing.Quadratic.In)
				.onComplete(() => {
					this.leafManager.visible = true
					this.stem.visible = true
					tw2.start()
				})
				.start()
		})
	}
}

export default new Stage()