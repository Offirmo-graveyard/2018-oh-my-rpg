const {
	stylizeString,
	clearCli,
} = require('../deps')

/////////////////////////////////////////////////

const render_adventure_screen = require('./adventure').render
const render_inventory_screen = require('./inventory').render

/////////////////////////////////////////////////

function divide() {
	console.log('\n---------------------------------------------------------------\n')
}

function render_header({may_clear_screen, version}) {
	if (may_clear_screen)
		clearCli()
	else
		divide()

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
HEALTH:${health} MANA:${mana} STR:${strength} AGI:${agility} CHA:${charisma} WIS:${wisdom} LUCK:${luck}`)
}

function render_interactive_before(screen, options) {
	render_header(options)
	render_recap(options)
	divide()
}
function render_interactive_after(screen, options) {
	switch(screen) {
		case 'main':
			render_adventure_screen(options)
			break

		case 'inventory':
			render_inventory_screen(options)
			break

		default:
			console.error(`Screen "${screen}" not implemented!`)
	}
	divide()
}

function render_non_interactive_before(options) {
	render_header(options)
	render_recap(options)
}
function render_non_interactive_after(options) {
	render_adventure_screen(options)
}

/////////////////////////////////////////////////

module.exports = {
	render_interactive_before,
	render_interactive_after,
	render_non_interactive_before,
	render_non_interactive_after,
}
