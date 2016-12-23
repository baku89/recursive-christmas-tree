/* global createjs */
import EventEmitter from 'eventemitter3'

const Sound = createjs.Sound

const rythm = [
	1, 1, 2,
	1, 1, 2,
	1, 1, 1, 1, 4,
	1, 1, 1, 1, 1, 1, 2,
	1, 1, 1, 1, 2, 2,

	1, 1, 2,
	1, 1, 2,
	1, 1, 1, 1, 4,
	1, 1, 1, 1, 1, 1, 2,
	1, 1, 1, 1, 4
]

const resetNote = [0, 24]
const snowNote = [0, 23]

// calculate offset time
let offset = 0
for (let i = 0; i < rythm.length; i++) {
	let duration = rythm[i] * Config.BEAT_DURATION
	rythm[i] = {offset: offset, duration: duration}
	offset += duration
}

class Controller extends EventEmitter {

	constructor() {
		super()

		this.notPressed = true
		this.notReset = true
		this.currentNote = 0

		this.send = this.send.bind(this)

		timeline.on('start-grow', this.start.bind(this))
	}

	start() {

		document.addEventListener('keydown', this.send)
		$(window).on('touchstart mousedown', this.send)
	}

	send() {

		let type = THREE.Math.randInt(0, Config.PATTERN_NUM - 1)

		// play
		let ppc = new createjs.PlayPropsConfig().set({
			startTime: rythm[this.currentNote].offset,
			duration: rythm[this.currentNote].duration
		})
		Sound.play('jingle-bell', ppc)

		if (!this.notPressed && resetNote.indexOf(this.currentNote) != -1) {
			if (this.notReset) {
				console.log('first-reset')
				this.emit('first-reset')
				this.notReset = false
			}
			console.log('reset')
			this.emit('reset')
		}

		if (snowNote.indexOf(this.currentNote) != -1) {
			this.emit('snow')
		}

		if (!this.notPressed && this.currentNote == 0) {
			this.emit('invert')
		}
		
		this.currentNote = (this.currentNote + 1) % rythm.length
 
		this.emit('tap', type)

		if (this.notPressed) {
			setTimeout(() => {
				this.emit('first-tap')
			}, 1000)
			this.notPressed = false
		}
	}
}

window.controller = new Controller()