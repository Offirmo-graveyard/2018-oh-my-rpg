const { version } = require('../package.json')
const { stylizeString } = require('./deps')
const { render_header, render_recap, render_adventure_screen } = require('./screens')
const { init_globalize, init_savegame } = require('./init')
const { play } = require('./actions')
const { render_cta_relaunch_game } = require('./calls-to-action')

/////////////////////////////////////////////////

const MINIMAL_TERMINAL_WIDTH = 80

const options = {
	version,
	verbose: false,
	is_interactive: true,
	may_clear_screen: true,
	term_width: MINIMAL_TERMINAL_WIDTH,
}


options.is_interactive = false //!!process.stdout.isTTY // TODO read params also
options.may_clear_screen = options.is_interactive
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

if (options.is_interactive)
	return console.log('TODO')

/////////////////////////////////////////////////

play(options)
render_adventure_screen(options)

// TODO print advices (equip, sell...)
render_cta_relaunch_game(options)

console.log('\n---------------------------------------------------------------\n')

