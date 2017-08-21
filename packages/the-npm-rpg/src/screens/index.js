const {
	stylizeString,
	clearCli,
} = require('../deps')

/////////////////////////////////////////////////

const render_adventure_screen = require('./adventure').render

/////////////////////////////////////////////////

function render_header({may_clear_screen, version}) {
	if (may_clear_screen)
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
	const state = config.store
	const {good_click_count} = state

	if (good_click_count === 0)
		return console.log(
stylizeString.bold(`Congratulations, adventurer!\n`)
+ `Your are more courageous, cunning and curious than your peers:
You dared to enter this unknown realm, for glory and adventures! (and loot 💰 ;)

Great sages prophetized your coming,
commoners are waiting for their hero
and kings are trembling from fear of change...
..undoubtly, you'll make a name in this world and fulfill your destiny!

A great saga just started...`
	)

	const {
		level,
		health,
		mana,
		strength,
		agility,
		charisma,
		wisdom,
		luck,
	} = state.avatar.characteristics
	console.log(
`The great saga of ${stylizeString.bold(state.avatar.name)}, ${state.avatar.klass} LVL${level}
HEALTH:${health} MANA:${mana} STR:${strength} AGI:${agility} CHA:${charisma} WIS:${wisdom} LUCK:${luck}
`)
}

/////////////////////////////////////////////////

module.exports = {
	render_header,
	render_recap,
	render_adventure_screen,
}
