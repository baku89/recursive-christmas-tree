import EventEmitter from 'eventemitter3'

let w = 80
let h = 80

let lerpIntensity = .15

class CameraRig extends THREE.Group {

	constructor() {
		super()

		this.eventEmitter = new EventEmitter()

		// camera
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2000)
		this.camera.position.set(600, 300, 600)
		this.camera.lookAt(new THREE.Vector3(0, 0, 0))
		// this.camera.position.y = -2
		this.add(this.camera)

		// this.add(new THREE.AxisHelper(20))

		// light
		{
			let dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
			dirLight.position.set(100, 100, 20)
			this.add(dirLight)

			let fillLight = new THREE.DirectionalLight(Config.FILL_LIGHT, 1.0)
			fillLight.position.set(-100, 100, 20)
			this.add(fillLight)

			// this.add( new THREE.CameraHelper(dirLight.shadow.camera) )
		}

		// set this
		this.stepY = Config.LEAF_Y
		this.position.y = Config.LEAF_OFFSET_Y
		this.targetY = this.position.y
		this.targetRot = 0
		this.targetZoom = 0.4
		this.zoomStep = Config.LEAF_SCALE_INV * 1.0406429335


		// offset 4
		for (let i = 0; i < 4; i++) {
			this.targetY += this.stepY
			this.stepY *= Config.LEAF_SCALE
		}

		this.position.y = this.targetY
		this.camera.zoom = this.targetZoom
		this.camera.updateProjectionMatrix()

		this.initialStepY = this.stepY
		this.initialTargetY = this.targetY
		controller.on('reset', this.reset.bind(this))
	}

	lift() {
		this.targetY += this.stepY
		this.targetRot += Config.CAMERA_ROT
		this.targetZoom *= this.zoomStep

		this.stepY *= Config.LEAF_SCALE
	}

	reset() {
		let rot = this.rotation.y * -1
		console.log('camera', rot)

		this.stepY = this.initialStepY
		this.targetY = this.initialTargetY
		this.targetZoom = 1
		this.zoomStep = Config.LEAF_SCALE_INV

		this.position.y = this.targetY

		this.camera.zoom = 1
		this.camera.updateProjectionMatrix()
	}

	update() {

		this.position.y += (this.targetY - this.position.y) * lerpIntensity
		this.rotation.y += (this.targetRot - this.rotation.y) *  lerpIntensity
		this.camera.zoom += (this.targetZoom - this.camera.zoom) * lerpIntensity

		this.camera.updateProjectionMatrix()
	}

	// EventEmiter
	on(name, cb) {
		this.eventEmitter.on(name, cb)
	}

	setAspect(aspect) {
		
		this.camera.left 		= w * aspect / -2
		this.camera.right 	= w * aspect / 2
		this.camera.top			= w / 2
		this.camera.bottom	= w / -2

		this.camera.updateProjectionMatrix()
	}

	emit(name, e) {
		this.eventEmitter.emit(name, e)
	}
}

export default new CameraRig()