const { version } = require('../package.json')
const { render_header, render_recap } = require('./screens')
const { init_globalize, init_savegame } = require('./init')
const { play } = require('@oh-my-rpg/state-the-boring-rpg')
const { cta_relaunch_game } = require('./calls-to-action')

/////////////////////////////////////////////////

const options = {
	version,
	verbose: false,
	isInteractive: true,
	mayClearScreen: true,
}

options.isInteractive = false //!!process.stdout.isTTY // TODO read params also
options.mayClearScreen = options.isInteractive
options.globalize = init_globalize(options)
options.config = init_savegame(options)

/////////////////////////////////////////////////


/////////////////////////////////////////////////

render_header(options)
render_recap(options)

/////////////////////////////////////////////////

if (options.isInteractive)
	return console.log('TODO')

/////////////////////////////////////////////////

const state = play(options.config.store)
console.log(`That was your adventure #${state.good_click_count}!`)
options.config.set(state)
// TODO print advices (equip, sell...)
cta_relaunch_game()
