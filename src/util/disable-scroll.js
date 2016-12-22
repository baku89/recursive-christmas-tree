// prevent scroll on mobile
window.addEventListener('scroll', preventMotion, false)
window.addEventListener('touchmove', preventMotion, false)

function preventMotion(event)
{
	window.scrollTo(0, 0)
	event.preventDefault()
	event.stopPropagation()
}

