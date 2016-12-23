import Leaf from './leaf'

class MovingLeaf extends Leaf {
	
	constructor(name) {
		super()

		this.name = name

		let scene = assets.model[name].scene

		this.model = scene.children[0].clone()
		this.add(this.model)
	}

	start() {
		console.log(`${this.name} has no animation`)
	}
}

//--------------------------------------------------

class MovingLeaf0 extends MovingLeaf {
	constructor() {
		super('pattern0')
	}

	start() {

		new TWEEN.Tween(this.model.rotation)
			.to({y: Math.PI}, 2000)
			.easing(TWEEN.Easing.Cubic.Out)
			.start()
	}
}


//--------------------------------------------------

class MovingLeaf1 extends MovingLeaf {
	constructor() {
		super('pattern1')
	}

	start() {

		new TWEEN.Tween(this.model.rotation)
			.to({y: Math.PI}, 2000)
			.easing(TWEEN.Easing.Cubic.Out)
			.start()
	}
}


export default [
	MovingLeaf0,
	MovingLeaf1
]
