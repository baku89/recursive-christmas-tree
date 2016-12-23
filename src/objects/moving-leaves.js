import Leaf from './leaf'

const Tween = TWEEN.Tween

function getModel(name) {
	let scene = assets.model[name].scene
	return scene
}

function convertToSplineGeometry(geometry) {
	let bufferGeometry = new THREE.BufferGeometry()

	let vs = geometry.vertices

	let positions = new Float32Array(vs.length * 3)

	for (let i = 0; i < vs.length; i++) {
		positions[i*3  ] = vs[i].x
		positions[i*3+1] = vs[i].y
		positions[i*3+2] = vs[i].z
	}
	positions = new THREE.BufferAttribute(positions, 3)
	bufferGeometry.addAttribute('position', positions)

	return bufferGeometry
}

function runSplineAnimation(line, duration = 1500, width = 0.2) {

	let geom = line.geometry
	let num = geom.attributes.position.count
	let count = Math.ceil(num * width)

	new TWEEN.Tween({start: -count})
		.to({start: num}, duration)
		.onUpdate(function() {
			geom.setDrawRange(
				Math.max(this.start, 0),
				Math.min(count, num - this.start)
			)
		})
		.easing(TWEEN.Easing.Cubic.Out)
		.start()
}

//--------------------------------------------------

class MovingLeaf extends Leaf {
	
	constructor(name, autoAdd = true) {
		super()


		this.name = name || ''

		if (name) {
			this.model = getModel(name).clone()

			if (autoAdd) {
				this.add(this.model)
			}
		}
	}

	start() {
		console.log(`${this.name} has no animation`)
	}
}

//--------------------------------------------------

class MovingLeaf0 extends MovingLeaf {
	constructor() {
		super('pattern0')

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
}

//--------------------------------------------------

class MovingLeaf2 extends Leaf {
	constructor() {
		super()

		// model
		let spline = MovingLeaf2.createSpline()
		this.add(spline)

		this.balls = MovingLeaf2.balls.clone()
		this.add(this.balls)

		runSplineAnimation(spline, 2600)


		this.balls.position.y = 6
		this.balls.scale.set(.5, .5, .5)
		this.balls.rotation.y = -Math.PI / 2

		new Tween(this.balls.position)
			.to({y: 0}, 400)
			.easing(TWEEN.Easing.Cubic.Out)
			.start()

		new Tween(this.balls.scale)
			.to({x:1, y:1, z:1}, 400)
			.easing(TWEEN.Easing.Cubic.Out)
			.start()

		new Tween(this.balls.rotation)
			.to({y: 0}, 1000)
			.easing(TWEEN.Easing.Cubic.Out)
			.start()

			

	}

	static createSpline() {
		return new THREE.Line(
			this.spline.geometry.clone(),
			this.spline.material
		)
	}
}

{
	let geom = getModel('splines').children[0].children[0].geometry
	MovingLeaf2.spline = {
		geometry: convertToSplineGeometry(geom),
		material: new THREE.LineBasicMaterial({
			color: 0xFF4883
		})
	}

	let model = getModel('pattern2')
	MovingLeaf2.balls = model.children[1]
}

//--------------------------------------------------



export default [
	MovingLeaf2,
	MovingLeaf0,
	MovingLeaf1
]
