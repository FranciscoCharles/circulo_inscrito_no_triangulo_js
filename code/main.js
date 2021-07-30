
const canvas = document.querySelector('.display')

const context = canvas.getContext('2d')

const maxHeight = canvas.height
const maxWidth = canvas.width
let timer = undefined
const triangle = new Triange(context, 30, 30, 440)
let is_moving = false
let moved_point = null

context.lineWidth = 4

function stopMouseMove() {
	is_moving = false
	canvas.style.cursor = 'pointer'
	timer = clearInterval(timer)
}
document.addEventListener('mouseup', stopMouseMove)

document.addEventListener('mousedown', function (event) {

	const mousex = event.clientX
	const mousey = event.clientY
	const point = triangle.points[0]

	if (collidePoint(point, 20, mousex, mousey)) {
		canvas.style.cursor = 'grabbing'
		is_moving = true
		moved_point = point
		if (!timer) {
			timer = setInterval(() => triangle.draw(), 100)
		}
	}
})

document.addEventListener('mousemove', function (event) {
	if (!is_moving) return;

	moved_point[0] = event.clientX
	moved_point[1] = event.clientY

	if (!pointWithinLimits(moved_point, maxWidth, maxHeight)) {
		const [x, y] = checkAndResolvePoint(moved_point, maxWidth, maxHeight)
		moved_point[0] = x
		moved_point[1] = y
	}
})

triangle.draw()
