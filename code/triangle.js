
const canvas = document.querySelector('.display');

function colidePoint(point, raio, mousex, mousey) {
	return Math.hypot((point[0] - mousex), (point[1] - mousey)) < raio
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
	const ctx = canvas.getContext('2d');
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
			ctx.clearRect(0, 0, 500, 500);
			ctx.beginPath();
			ctx.moveTo(...p1);
			ctx.lineTo(...p2);
			ctx.lineTo(...this.unlock_point);
			ctx.lineTo(...p1);
			ctx.stroke()
			ctx.closePath()

			this.drawBissetrizes()
		}
		drawBissetrizes() {

			const [p1, p2] = this.points
			const m1 = calculaPontoMedio(p1, this.unlock_point)
			const m2 = calculaPontoMedio(p1, p2)

			ctx.strokeStyle = 'red'
			ctx.beginPath();
			ctx.moveTo(...m1);
			ctx.lineTo(...p2);
			ctx.stroke()
			ctx.closePath()

			ctx.strokeStyle = 'blue'
			ctx.beginPath();
			ctx.moveTo(...m2);
			ctx.lineTo(...this.unlock_point);
			ctx.stroke()
			ctx.closePath()

			ctx.strokeStyle = 'black'

			const a = (m2[1] - this.unlock_point[1]) / (m2[0] - this.unlock_point[0])
			const N2 = m2[1] - a * m2[0]


			const b = (m1[1] - p2[1]) / (m1[0] - p2[0])
			const N1 = m1[1] - b * m1[0]


			const xCirculo = (N2 - N1) / (b - a)
			const yCirculo = xCirculo * b + N1


			const la = Math.hypot(p1[0] - p2[0], p1[1] - p2[1])
			const lb = Math.hypot(p2[0] - this.unlock_point[0], p2[1] - this.unlock_point[1])
			const lc = Math.hypot(this.unlock_point[0] - p1[0], this.unlock_point[1] - p1[1])

			const half_p = (la + lb + lc) / 2
			const r = Math.sqrt(half_p * (half_p - la) * (half_p - lb) * (half_p - lc)) / half_p
			/*
			A = p*r/2

			2*A/p
			*/
			console.log(r);
			ctx.beginPath();
			ctx.arc(xCirculo, yCirculo, r, 0, 2 * Math.PI)
			ctx.stroke()
			ctx.closePath()
		}

	}
	let timer = undefined
	const triangle = new Triange(30, 340, 100)
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