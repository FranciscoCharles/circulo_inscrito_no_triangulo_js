class Triange {
	constructor(context2d, x, y, L) {
		this.x = x
		this.y = y
		this.context2d = context2d
		this.points = [[x, y], [x + L, y + L], [x, y + L]]
	}
	draw() {
		this.clearScreen()
		this.drawInscritCircle()
		this.drawBissetrizes()
		this.drawTriangle()
		this.drawVertexMove()
	}
	clearScreen() {
		const ctx = this.context2d
		const old_fill_color = ctx.fillStyle
		ctx.clearRect(0, 0, 500, 500)
		ctx.fillStyle = 'ghostwhite'
		ctx.rect(0, 0, 500, 500)
		ctx.fill()
		ctx.fillStyle = old_fill_color
	}
	drawTriangle() {
		const ctx = this.context2d
		ctx.beginPath()
		this.points.forEach((point, index) => {
			if (index === 0) ctx.moveTo(...point)
			else ctx.lineTo(...point)
		})
		ctx.lineTo(...this.points[0])
		ctx.stroke()
		ctx.closePath()

		this.drawBissetrizes()
	}
	drawVertexMove() {

		const ctx = this.context2d
		const point = this.points[0]
		const old_line_width = ctx.lineWidth
		const old_fill_color = ctx.fillStyle

		ctx.fillStyle = 'red'
		ctx.lineWidth = 2

		drawCircleWithBorder(ctx, point[0], point[1], 10)

		ctx.lineWidth = old_line_width
		ctx.fillStyle = old_fill_color
	}
	drawBissetrizes() {
		const ctx = this.context2d
		const colors = ['red', 'blue', 'green']
		let barycenter_x = 0
		let barycenter_y = 0

		const old_stroke_color = ctx.strokeStyle
		this.points.forEach((point, index, points) => {

			const next_point = points[(index + 1) % 3]
			const end_point = points[(index + 2) % 3]
			const mediun_point = calculateMediunPoint(point, next_point)

			ctx.strokeStyle = colors[index]
			ctx.beginPath()
			ctx.moveTo(...mediun_point)
			ctx.lineTo(...end_point)
			ctx.stroke()
			ctx.closePath()

			barycenter_x += point[0]
			barycenter_y += point[1]
		})
		barycenter_x /= 3
		barycenter_y /= 3
		ctx.strokeStyle = old_stroke_color

		const old_fill_color = ctx.fillStyle
		const old_line_width = ctx.lineWidth

		ctx.fillStyle = 'green'
		ctx.lineWidth = 2
		drawCircleWithBorder(ctx, barycenter_x, barycenter_y, 10)

		ctx.fillStyle = old_fill_color
		ctx.lineWidth = old_line_width

	}
	drawInscritCircle() {

		const ctx = this.context2d
		const [p1, p2, p3] = this.points
		const a = Math.hypot(p1[0] - p2[0], p1[1] - p2[1])
		const b = Math.hypot(p2[0] - p3[0], p2[1] - p3[1])
		const c = Math.hypot(p3[0] - p1[0], p3[1] - p1[1])

		const half_p = (a + b + c) / 2
		const radius = Math.sqrt(half_p * (half_p - a) * (half_p - b) * (half_p - c)) / half_p

		const ab_angle = getAngle(c, a, b) / 2
		const distance = radius / Math.tan(ab_angle)
		const x_circle = p2[0] - distance
		const y_circle = p2[1] - radius

		const old_fill_color = ctx.fillStyle
		const old_line_width = ctx.lineWidth

		ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
		drawCircleWithBorder(ctx, x_circle, y_circle, radius)

		ctx.fillStyle = 'rgba(100, 0, 0, 0.5)'
		ctx.lineWidth = 2
		drawCircleWithBorder(ctx, x_circle, y_circle, 10)

		ctx.fillStyle = old_fill_color
		ctx.lineWidth = old_line_width
	}

}