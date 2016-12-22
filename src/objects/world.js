class World extends THREE.Group {

	constructor() {
		super()

		{
			// debug
			// this.add(new THREE.GridHelper(200, 10))
			// this.add(new THREE.AxisHelper(70))
		}
	}
}

export default new World(9)