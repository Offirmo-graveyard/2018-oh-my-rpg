const loadJsonFile = require('load-json-file')

const { stylize_string } = require('./libs')
const { prettify_json_for_debug } = require('./utils')

const { init_savegame } = require('./init')
const { play } = require('./actions')
const { start_loop } = require('./interactive_mode')

/////////////////////////////////////////////////

const MINIMAL_TERMINAL_WIDTH = 80

const PACKAGE_JSON_PATH = require('path').join('.', 'package.json')
const { version } = loadJsonFile.sync(PACKAGE_JSON_PATH)

const options = {
	version,
	verbose: true, // XXX
	is_interactive: true,
	may_clear_screen: true,
	term_width: MINIMAL_TERMINAL_WIDTH,
}
options.is_interactive = !!process.stdout.isTTY // TODO read params also
//options.is_interactive = false
options.may_clear_screen = options.is_interactive
options.config = init_savegame(options)

/////////////////////////////////////////////////

if (options.is_interactive) {
	start_loop(options)
		.catch(e => console.error('Error:\n' + stylize_string.red(prettify_json_for_debug(e))))
		// TODO report
		.then(() => console.log('Quitting...'))
}

/////////////////////////////////////////////////

if (!options.is_interactive) {
	throw new Error('TODO')
	play(options)
	//render_cta(options)
}

console.log('\n---------------------------------------------------------------\n')
