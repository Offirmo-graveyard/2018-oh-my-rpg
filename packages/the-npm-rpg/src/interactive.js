const readline = require('readline')
const {
	prettifyJson,
	stylizeString,
} = require('./deps')

/////////////////////////////////////////////////

const { play } = require('./actions')
const { render_interactive_before, render_interactive_after } = require('./screens')


/////////////////////////////////////////////////

function start_loop(options) {
	if (!process.stdout.isTTY)
		throw new Error('start_loop: current term is not a tty !')

	const COMMANDS_FOR_SCREEN = {
		'*': [
			{ key: 'q', description: 'quit', cb() { console.log('good bye!'); process.exit() }}
		],
		main: [
			{ key: 'p', description: 'play', cb() { play(options) }},
			{ key: 'i', description: 'inventory', cb() { switch_screen('inventory') }},
		],
		inventory: [
			{ key: 'a', description: 'item 1', cb() { console.log('select item 1 TODO') }},
			{ key: 'x', description: 'exit', cb() { switch_screen('main') }},
		],
	}

	function get_commands_for_screen(screen_id) {
		return [
			...COMMANDS_FOR_SCREEN[screen_id],
			...COMMANDS_FOR_SCREEN['*'],
		]
	}

	function render_command({key, description}) {
		if (description.startsWith('$'))
			console.log(`${description}`)
		else
			console.log(`${key} - ${description}`)
	}

	let current_screen_id = 'main'

	readline.emitKeypressEvents(process.stdin)
	process.stdin.setRawMode(true)

	function switch_screen(id) {
		current_screen_id = id
	}
	function render_commands() {
		//console.log(get_commands_for_screen(current_screen_id))
		get_commands_for_screen(current_screen_id).forEach(render_command)
	}
	render_interactive_before(current_screen_id, options)
	render_commands()

	process.stdin.on('keypress', (str, key_pressed) => {
		//console.log({current_screen_id})
		if (!key_pressed)
			throw new Error('keypress: Y U no key?!')

		if (key_pressed.ctrl) // ctrl C, ctrl D, whatever
			process.kill(process.pid, 'SIGINT');

		if (!current_screen_id)
			throw new Error('keypress: unknown current screen!')

		if (!COMMANDS_FOR_SCREEN[current_screen_id])
			throw new Error('keypress: no keymap for current screen!')

		const keymap = get_commands_for_screen(current_screen_id).find(({key}) => key === key_pressed.name)
		//console.log(key_pressed, keymap)
		if (!keymap) {
			console.log(`unrecognized key: ${key_pressed.name}`)
		}
		else {
			render_interactive_before(current_screen_id, options)
			keymap.cb()
			render_interactive_after(current_screen_id, options)
			render_commands()
		}
	})

}

module.exports = {
	start_loop
}
