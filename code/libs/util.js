
function collidePoint(point, radius, mousex, mousey) {
	return Math.hypot((point[0] - mousex), (point[1] - mousey)) < radius
}
function radians2degree(radians) {
	return radians * 180 / Math.PI
}
function degree2radians(degree) {
	return degree * Math.PI / 180
}
function getAngle(a, b, c) {
	const cosAngle = (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)
	return Math.acos(cosAngle)
}
function calculateMediunPoint(p1, p2) {
	return [
		parseInt((p1[0] + p2[0]) / 2),
		parseInt((p1[1] + p2[1]) / 2)
	]
}
function pointWithinLimits(x, y, maxX, maxY) {
	return (x > 0) && (x < maxX) && (y > 0) && (y < maxY)
}
function checkAndResolvePoint([x, y], maxX, maxY) {
	if (x < 0) {
		x = 0
	} else if (x > maxX) {
		x = maxX
	}
	if (y < 0) {
		y = 0
	} else if (y > maxY) {
		y = maxY
	}
	return [x, y]
}
function drawCircleWithBorder(ctx, x, y, radius) {
	ctx.beginPath()
	ctx.arc(x, y, radius, 0, 2 * Math.PI)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()
}