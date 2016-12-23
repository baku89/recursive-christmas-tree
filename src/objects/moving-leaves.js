import Leaf from './leaf'

const Tween = TWEEN.Tween

const balls = assets.model['balls']
const whiteBallMaterial = new THREE.MeshLambertMaterial({
	color: 0xffffff,
	emissive: 0x155A76
})

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

function runSplineAnimation(line, duration = 1500, width = 0.2, delay = 0) {

	let geom = line.geometry
	let num = geom.attributes.position.count
	let count = Math.ceil(num * width)

	geom.setDrawRange(0, 0)

	setTimeout(() => {

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

	}, delay)
}

function runBallAnimation(balls) {
	balls.position.y = 6
	balls.scale.set(.5, .5, .5)
	balls.rotation.y = -Math.PI / 2

	new Tween(balls.position)
		.to({y: 0}, 400)
		.easing(TWEEN.Easing.Cubic.Out)
		.start()

	new Tween(balls.scale)
		.to({x:1, y:1, z:1}, 400)
		.easing(TWEEN.Easing.Cubic.Out)
		.start()

	new Tween(balls.rotation)
		.to({y: 0}, 1000)
		.easing(TWEEN.Easing.Cubic.Out)
		.start()
}
//--------------------------------------------------

class MovingLeaf0 extends Leaf {
	constructor() {
		super()

		let splines = MovingLeaf0.splines.clone()
		this.add(splines)

		this.balls = MovingLeaf0.balls.clone()

		this.add(this.balls)

		runBallAnimation(this.balls)

		new Tween(splines.position)
		.to({y: -40}, 3000)
		.easing(TWEEN.Easing.Cubic.Out)
		.start()

		new Tween(splines.scale)
			.to({x:2.4, y:2.4, z:2.4}, 3000)
			.easing(TWEEN.Easing.Cubic.Out)
			.start()

		new Tween(splines.rotation)
			.to({y: Math.PI}, 3000)
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
	{
		let geom = getModel('splines').children[0].children[0].geometry
		geom = convertToSplineGeometry(geom)
		let mat = new THREE.LineBasicMaterial({
			color: 0xE1CEAC
		})

		let spline1 = new THREE.LineSegments(geom, mat)
		let spline2 = new THREE.Line(geom, mat)

		spline2.position.y = 1
		spline2.scale.set(.95, .95, .95)

		let splines = new THREE.Group()
		splines.add(spline1)
		splines.add(spline2)

		MovingLeaf0.splines = splines
	}


	let parent = new THREE.Group()
	
	parent.add(new THREE.Mesh(
		balls.getObjectByName('balls.white.0').geometry,
		whiteBallMaterial
	))

	parent.add(new THREE.Mesh(
		balls.getObjectByName('balls.yellow.0').geometry,
		new THREE.MeshLambertMaterial({
			color: 0xE8C94F,
			emissive: 0x8B341F
		})
	))
	
	MovingLeaf0.balls = parent
}


//--------------------------------------------------

class MovingLeaf1 extends Leaf {
	constructor() {
		super()

		// model
		let spline1 = MovingLeaf1.createSpline()
		this.add(spline1)

		let spline2 = MovingLeaf1.createSpline()
		spline2.rotation.y = THREE.Math.degToRad(-60)
		this.add(spline2)

		let spline3 = MovingLeaf1.createSpline()
		spline3.rotation.y = THREE.Math.degToRad(-120)
		this.add(spline3)


		runSplineAnimation(spline1, 2000, .2, 0)

		runSplineAnimation(spline2, 2000, .2, 200)
		runSplineAnimation(spline3, 2000, .2, 400)

		this.balls = MovingLeaf1.balls.clone()
		this.add(this.balls)

		runBallAnimation(this.balls)
	}

	static createSpline() {
		return new THREE.Line(
			this.spline.geometry.clone(),
			this.spline.material
		)
	}
}

{
	let geom = getModel('splines').children[1].children[0].geometry
	MovingLeaf1.spline = {
		geometry: convertToSplineGeometry(geom),
		material: new THREE.LineBasicMaterial({
			color: 0xA4DC0F
		})
	}

	let parent = new THREE.Group()

	parent.add(new THREE.Mesh(
		balls.getObjectByName('balls.white.1').geometry,
		whiteBallMaterial
	))

	parent.add(new THREE.Mesh(
		balls.getObjectByName('balls.magenta.1').geometry,
		new THREE.MeshLambertMaterial({
			color: 0xEF331B,
			emissive: 0x6C1576
		})
	))
	
	MovingLeaf1.balls = parent
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
		runBallAnimation(this.balls)
	}

	static createSpline() {
		return new THREE.Line(
			this.spline.geometry.clone(),
			this.spline.material
		)
	}
}

{
	let geom = getModel('splines').children[2].children[0].geometry
	MovingLeaf2.spline = {
		geometry: convertToSplineGeometry(geom),
		material: new THREE.LineBasicMaterial({
			color: 0xFF4883
		})
	}

	let parent = new THREE.Group()

	parent.add(new THREE.Mesh(
		balls.getObjectByName('balls.white.2').geometry,
		whiteBallMaterial
	))

	parent.add(new THREE.Mesh(
		balls.getObjectByName('balls.purple.2').geometry,
		new THREE.MeshLambertMaterial({
			color: 0x4F7DE8,
			emissive: 0x591576
		})
	))
	
	MovingLeaf2.balls = parent
}

//--------------------------------------------------



export default [
	MovingLeaf0,
	MovingLeaf1,
	MovingLeaf2
]
