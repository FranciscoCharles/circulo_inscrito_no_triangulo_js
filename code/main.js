const canvas = document.querySelector('.display')
const maxHeight = canvas.height
const maxWidth = canvas.width
const { 'x': canvas_x, 'y': canvas_y } = canvas.getBoundingClientRect()
const context = canvas.getContext('2d')

const triangle = new Triange(context, 30, 30, 440)
const point_maxY = 430
let moved_point = null
let is_moving = false
let timer = undefined

context.lineWidth = 4

function mouseAtValidRegion(mousex, mousey) {
	return (mousex > 0 && mousex < maxWidth) && (mousey > 0 && mousey < maxHeight)
}
function stopMouseMove() {
	is_moving = false
	canvas.style.cursor = 'default'
	timer = clearInterval(timer)
}

document.addEventListener('mouseup', stopMouseMove)

document.addEventListener('mousedown', function (event) {

	const mousex = event.clientX - canvas_x
	const mousey = event.clientY - canvas_y

	if (!mouseAtValidRegion(mousex, mousey)) return;

	const point = triangle.points[0]

	if (collidePoint(point, 20, mousex, mousey)) {
		canvas.style.cursor = 'grabbing'
		is_moving = true
		moved_point = point
		if (!timer) timer = setInterval(() => triangle.draw(), 100)
	}
})

document.addEventListener('mousemove', function (event) {
	const mousex = event.clientX - canvas_x
	const mousey = event.clientY - canvas_y
	if (!mouseAtValidRegion(mousex, mousey)) {
		if (canvas.style.cursor !== 'default') canvas.style.cursor = 'default'
		return;
	}

	if (!is_moving) {
		const point = triangle.points[0]
		let colide = collidePoint(point, 20, mousex, mousey)
		canvas.style.cursor = colide ? 'grab' : 'default'
		return;
	}
	moved_point[0] = mousex
	moved_point[1] = mousey > point_maxY ? point_maxY : mousey

	if (!pointWithinLimits(moved_point, maxWidth, maxHeight)) {
		const [x, y] = checkAndResolvePoint(moved_point, maxWidth, maxHeight)
		moved_point[0] = x
		moved_point[1] = y
	}
	event.preventDefault()
})

triangle.draw()
