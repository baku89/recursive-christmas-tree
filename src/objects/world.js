class World extends THREE.Object3D {

	constructor() {
		super()

		{
			// debug
			// this.scene.add(new THREE.GridHelper(200, 10))
			// this.add(new THREE.AxisHelper(70))
		}
	}
}

export default new World(9)