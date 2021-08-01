function main() {

	const point_maxY = 430
	let moved_point = null
	let is_moving = false
	let timer = undefined

	const canvas = document.querySelector('.display')
	const context = canvas.getContext('2d')
	context.lineWidth = 4

	let maxHeight = canvas.height
	let maxWidth = canvas.width
	let { x: canvas_x, y: canvas_y } = canvas.getBoundingClientRect()

	const triangle = new Triange(context, 30, 30, 440)

	window.addEventListener('resize', () => {
		maxHeight = canvas.height
		maxWidth = canvas.width;
		({ x: canvas_x, y: canvas_y } = canvas.getBoundingClientRect());
	})

	function stopMouseMove() {
		is_moving = false
		canvas.style.cursor = 'default'
		timer = clearInterval(timer)
	}

	document.addEventListener('mouseup', stopMouseMove)

	document.addEventListener('mousedown', event => {
		const mousex = event.clientX - canvas_x
		const mousey = event.clientY - canvas_y

		if (!pointWithinLimits(mousex, mousey, maxWidth, maxHeight)) return;

		const point = triangle.points[0]

		if (collidePoint(point, 20, mousex, mousey)) {
			canvas.style.cursor = 'grabbing'
			is_moving = true
			moved_point = point
			if (!timer) timer = setInterval(() => triangle.draw(), 100)
		}
	})

	document.addEventListener('mousemove', event => {
		const mousex = event.clientX - canvas_x
		const mousey = event.clientY - canvas_y

		if (!pointWithinLimits(mousex, mousey, maxWidth, maxHeight)) {
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

		if (!pointWithinLimits(moved_point[0], moved_point[1], maxWidth, maxHeight)) {
			const [x, y] = checkAndResolvePoint(moved_point, maxWidth, maxHeight)
			moved_point[0] = x
			moved_point[1] = y
		}
	})

	triangle.draw()
}
window.onload = main
