function randomSixBitNumber() {
	const i = Math.random() * (999999 - 100000) + 100000
	return parseInt(i, 10)
}

module.exports = { randomSixBitNumber }
