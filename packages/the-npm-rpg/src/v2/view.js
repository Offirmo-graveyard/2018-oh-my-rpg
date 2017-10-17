const {
	stylizeString,
	clearCli,
} = require('./deps')

/////////////////////////////////////////////////

function divide() {
	console.log('\n---------------------------------------------------------------\n')
}

function render_header({may_clear_screen, version}) {
	if (may_clear_screen)
		clearCli()
	else
		divide()

	console.log(stylizeString.dim(
		stylizeString.bold('The npm RPG')
		+ ` - v${version} - `
		+ stylizeString.underline('http://www.online-adventur.es/the-npm-rpg')
		+ '\n'
	))
}

/////////////////////////////////////////////////

module.exports = {
	render_header,
}
