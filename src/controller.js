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

const beatDuration = 291

// calculate offset time
let offset = 0
for (let i = 0; i < rythm.length; i++) {
	let duration = rythm[i] * beatDuration
	rythm[i] = {offset: offset, duration: duration}
	offset += duration
}

class Controller extends EventEmitter {

	constructor() {
		super()

		this.notPressed = true
		this.notReset = true
		this.currentNote = 0

		timeline.on('start-grow', this.start.bind(this))
	}
	start() {

		console.log('start listening')
		document.addEventListener('keydown', this.onKeydown.bind(this))
		$(window).on('touchstart', this.onTouchstart.bind(this))
	}

	onKeydown(e) {
		let key = String.fromCharCode(e.keyCode)
		let type = e.keyCode % 2

		this.send(type)
	}

	onTouchstart(e) {

		this.send(0)
	}

	send(type) {

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
		
		this.currentNote = (this.currentNote + 1) % rythm.length
 
		this.emit('tap', type)

		if (this.notPressed) {
			this.emit('first-tap')
			this.notPressed = false
		}
	}
}

window.controller = new Controller()