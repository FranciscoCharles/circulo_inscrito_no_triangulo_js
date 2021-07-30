class Triange {
	constructor(context2d, x, y, L) {
		this.x = x
		this.y = y
		this.context2d = context2d
		this.points = [[x, y], [x + L, y + L], [x, y + L]]
	}
	draw() {
		this.drawTriangle()
		this.drawBissetrizes()
		this.drawInscritCircle()
	}
	drawTriangle() {
		const ctx = this.context2d
		const [p1, p2, p3] = this.points
		ctx.clearRect(0, 0, 500, 500)
		ctx.beginPath()
		ctx.moveTo(...p1)
		ctx.lineTo(...p2)
		ctx.lineTo(...p3)
		ctx.lineTo(...p1)
		ctx.stroke()
		ctx.closePath()
		this.drawBissetrizes()
	}
	drawBissetrizes() {
		const ctx = this.context2d
		const [p1, p2, p3] = this.points
		const m1 = calculateMediunPoint(p1, p3)
		const m2 = calculateMediunPoint(p1, p2)
		const m3 = calculateMediunPoint(p2, p3)

		ctx.strokeStyle = 'red'
		ctx.beginPath()
		ctx.moveTo(...m1)
		ctx.lineTo(...p2)
		ctx.stroke()
		ctx.closePath()

		ctx.strokeStyle = 'blue'
		ctx.beginPath()
		ctx.moveTo(...m2)
		ctx.lineTo(...p3)
		ctx.stroke()
		ctx.closePath()

		ctx.strokeStyle = 'orange'
		ctx.beginPath()
		ctx.moveTo(...m3)
		ctx.lineTo(...p1)
		ctx.stroke()
		ctx.closePath()
		ctx.strokeStyle = 'black'

	}
	drawInscritCircle() {
		const ctx = this.context2d
		const [p1, p2, p3] = this.points
		const a = Math.hypot(p1[0] - p2[0], p1[1] - p2[1])
		const b = Math.hypot(p2[0] - p3[0], p2[1] - p3[1])
		const c = Math.hypot(p3[0] - p1[0], p3[1] - p1[1])

		const half_p = (a + b + c) / 2
		const radius = Math.sqrt(half_p * (half_p - a) * (half_p - b) * (half_p - c)) / half_p

		const M2 = getAngle(c, a, b) / 2
		const distance = radius / Math.tan(M2)

		ctx.beginPath()
		ctx.arc(p2[0] - distance, p2[1] - radius, radius, 0, 2 * Math.PI)
		ctx.stroke()
		ctx.closePath()
	}

}