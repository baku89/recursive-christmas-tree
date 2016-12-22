import EventEmitter from 'eventemitter3'

class Timeline extends EventEmitter {

	constructor() {
		super()

		this.eventList = [
			{name: 'hide-loading', time: 500},
			{name: 'show-canvas', time: 1000},
			{name: 'show-tree', time: 1500},
			{name: 'start-grow', time: 6000},
			{name: 'hide-instruction', time: 8000}
		]
	}

	run() {

		this.eventList.forEach((event) => {
			setTimeout(() => {
				this.emit(event.name)
			}, event.time)
		})
	}
}

window.timeline = new Timeline()