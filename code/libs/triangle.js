
const canvas = document.querySelector('.display')

function colidePoint(point, raio, mousex, mousey) {
	return Math.hypot((point[0] - mousex), (point[1] - mousey)) < raio
}

function radians2degree(radians) {
	return radians * 180 / Math.PI
}
function degree2radians(degree) {
	return degree * Math.PI / 180
}
function getAngulo(a, b, c) {
	const cosAngle = (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)
	return Math.acos(cosAngle)
}
function calculaPontoMedio(p1, p2) {
	return [
		parseInt((p1[0] + p2[0]) / 2),
		parseInt((p1[1] + p2[1]) / 2)
	]
}
function pointInLimits([x, y]) {
	return (x > 0) && (x < 500) && (y > 0) && (y < 500)
}
function corrigirPonto([x, y]) {
	if (x < 0) {
		x = 0
	} else if (x > 500) {
		x = 500
	}
	if (y < 0) {
		y = 0
	} else if (y > 500) {
		y = 500
	}
	return [x, y]
}
if (canvas.getContext) {
	const ctx = canvas.getContext('2d')
	ctx.lineWidth = 4

	class Triange {
		constructor(x, y, L) {
			this.x = x
			this.y = y
			this.unlock_point = [x, y + L]
			this.points = [[x, y], [x + L, y + L]]
		}
		makePoints(x, y, L) {
			this.points = [[x, y], [x + L, y + L]]
		}
		draw() {
			const [p1, p2] = this.points
			ctx.clearRect(0, 0, 500, 500)
			ctx.beginPath()
			ctx.moveTo(...p1)
			ctx.lineTo(...p2)
			ctx.lineTo(...this.unlock_point)
			ctx.lineTo(...p1)
			ctx.stroke()
			ctx.closePath()

			this.drawBissetrizes()
		}
		drawBissetrizes() {

			const [p1, p2] = this.points
			const m1 = calculaPontoMedio(p1, this.unlock_point)
			const m2 = calculaPontoMedio(p1, p2)
			const m3 = calculaPontoMedio(p2, this.unlock_point)

			ctx.strokeStyle = 'red'
			ctx.beginPath()
			ctx.moveTo(...m1)
			ctx.lineTo(...p2)
			ctx.stroke()
			ctx.closePath()

			ctx.strokeStyle = 'blue'
			ctx.beginPath()
			ctx.moveTo(...m2)
			ctx.lineTo(...this.unlock_point)
			ctx.stroke()
			ctx.closePath()

			ctx.strokeStyle = 'orange'
			ctx.beginPath()
			ctx.moveTo(...m3)
			ctx.lineTo(...p1)
			ctx.stroke()
			ctx.closePath()
			ctx.strokeStyle = 'black'

			const a = Math.hypot(p1[0] - p2[0], p1[1] - p2[1])
			const b = Math.hypot(p2[0] - this.unlock_point[0], p2[1] - this.unlock_point[1])
			const c = Math.hypot(this.unlock_point[0] - p1[0], this.unlock_point[1] - p1[1])


			const half_p = (a + b + c) / 2
			const r = Math.sqrt(half_p * (half_p - a) * (half_p - b) * (half_p - c)) / half_p

			const M2 = getAngulo(c, a, b) / 2

			const d = r / Math.tan(M2)
			ctx.beginPath()
			ctx.arc(p2[0] - d, p2[1] - r, r, 0, 2 * Math.PI)
			ctx.stroke()
			ctx.closePath()
		}

	}
	let timer = undefined
	const triangle = new Triange(30, 30, 440)
	let movendo = false
	let ponto_movido = null

	function stopMouseMove() {
		movendo = false
		canvas.style.cursor = 'pointer'
		if (timer) {
			clearInterval(timer)
			timer = undefined
		}
	}

	document.addEventListener('mousedown', function (event) {
		const mousex = event.clientX
		const mousey = event.clientY

		triangle.points.some((point) => {
			if (colidePoint(point, 20, mousex, mousey)) {
				canvas.style.cursor = 'grabbing'
				movendo = true
				ponto_movido = point
				if (!timer) {
					timer = setInterval(() => triangle.draw(), 100)
				}
			}
			return movendo
		})
	})

	document.addEventListener('mouseup', function (_) {
		stopMouseMove()
	})
	document.addEventListener('mousemove', function (event) {
		if (movendo) {

			const mousex = event.clientX
			const mousey = event.clientY
			ponto_movido[0] = mousex
			ponto_movido[1] = mousey
			if (!pointInLimits(ponto_movido)) {
				const [x, y] = corrigirPonto(ponto_movido)
				ponto_movido[0] = x
				ponto_movido[1] = y
			}

		}

	})

	triangle.draw()
}