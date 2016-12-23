import Leaf from './leaf'

function getModel(name) {
	let scene = assets.model[name].scene
	return scene.children[0]
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
		let spline = MovingLeaf2.createSpline()
		this.add(spline)

		runSplineAnimation(spline)

	}

	static createSpline() {
		return new THREE.Line(
			this.spline.geometry.clone(),
			this.spline.material
		)
	}
}

{
	let geom = getModel('pattern2').children[0].geometry
	MovingLeaf2.spline = {
		geometry: convertToSplineGeometry(geom),
		material: new THREE.LineBasicMaterial({
			color: 0xFF4883,
			lineWidth: 3
		})
	}
}

//--------------------------------------------------



export default [
	MovingLeaf2,
	MovingLeaf0,
	MovingLeaf1
]
