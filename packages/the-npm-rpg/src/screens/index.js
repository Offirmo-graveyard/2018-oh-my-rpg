const {
	stylizeString,
	clearCli,
} = require('../deps')

/////////////////////////////////////////////////

function render_header({mayClearScreen, version}) {
	if (mayClearScreen)
		clearCli()
	else
		console.log('\n---------------------------------------------------------------\n')

	console.log(
		stylizeString.bold('The npm RPG')
		+ ` - v${version} - `
		+ stylizeString.underline('http://www.online-adventur.es/the-npm-rpg')
		+ '\n'
	)
}

function render_recap({config}) {
	const {good_click_count, avatar: { name }} = config.store

	if (good_click_count === 0)
		return console.log(
stylizeString.bold(`Congratulations, adventurer!\n`)
+ `Your are more courageous, cunning and curious than your peers:
You dared to enter this unknown realm, for glory and adventures! (and loot 💰 ;)

Undoubtly, you'll make a name in this world and fulfill your destiny.
Great sages prophetized your coming,
commoners are waiting for their hero
and kings are trembling from fear of change.

A great saga just started...`
	)

	console.log(`The great saga of ${name}, episode #${good_click_count}:`)
}

/////////////////////////////////////////////////

module.exports = {
	render_header,
	render_recap,
}
