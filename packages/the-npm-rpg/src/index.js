const { version } = require('../package.json')
const { render_header, render_recap } = require('./screens')
const { init_globalize, init_savegame } = require('./init')
const { play } = require('@oh-my-rpg/state-the-boring-rpg')
const { render_cta_relaunch_game } = require('./calls-to-action')

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
options.rendering_options = {
	mode: 'ansi',
	globalize: options.globalize,
	stylize: stylize_tbrpg_string,
	last_adventure: options.config.store.last_adventure,
}

/////////////////////////////////////////////////

function stylize_tbrpg_string(style, s) {
	switch(style) {
		case 'item_quality_common':
			return stylizeString.gray(s)
		case 'item_quality_uncommon':
			return stylizeString.green(s)
		case 'item_quality_rare':
			return stylizeString.blue(s)
		case 'item_quality_epic':
			return stylizeString.magenta(s)
		case 'item_quality_legendary':
			return stylizeString.red(s)
		case 'item_quality_artifact':
			return stylizeString.yellow(s)
		case 'change_outline':
			return stylizeString.italic.bold.red(s)
		default:
			return `[XXX unkwown style ${style}]`+ stylizeString.bold.red(s)
	}
}

/////////////////////////////////////////////////

render_header(options)
render_recap(options)

/////////////////////////////////////////////////

if (options.isInteractive)
	return console.log('TODO')

/////////////////////////////////////////////////

const state = play(options.config.store)
options.config.set(state)
//render_recap(options)
// TODO print advices (equip, sell...)
render_cta_relaunch_game(options)

console.log('\n---------------------------------------------------------------\n')

