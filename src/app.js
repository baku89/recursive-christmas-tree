import './timeline'
import './prevent-scroll'
import './controller'


import Canvas from './canvas'

export default class App {

	constructor() {

		this.canvas = new Canvas()

		$(window).on('scroll', (e) => {
			e.preventDefault()
		})

		// about
		$('.about__button, .about__content').on('click', () => {
			$('body').toggleClass('show-about')
		})

		if (Config.MOBILE) {
			$('.instruction-message').html('Tap Screen')
		}

		// start timeline
		timeline.run()

		timeline.on('hide-loading', () => {
			$('.loading').addClass('hide')
		})

		timeline.on('start-grow', () => {
			$('.instruction').addClass('show')
		})

		controller.on('first-tap', () => {
			$('.instruction').removeClass('show')
		})
	}
}
