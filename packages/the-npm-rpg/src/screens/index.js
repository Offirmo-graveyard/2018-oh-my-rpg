const {
	prettifyJson,
	boxify,
	stylizeString,
	wrapLines,
	clearCli,
} = require('../deps')

/////////////////////////////////////////////////

function render_header({mayClearScreen, version}) {
	if (mayClearScreen) clearCli()

	console.log(
		stylizeString.bold('The npm RPG')
		+ ` - v${version} - `
		+ stylizeString.underline('http://www.online-adventur.es/the-npm-rpg')
		+ '\n'
	)
}

function render_recap() {
	console.log(`TODO recap`)
}

/////////////////////////////////////////////////

module.exports = {
	render_header,
	render_recap,
}
