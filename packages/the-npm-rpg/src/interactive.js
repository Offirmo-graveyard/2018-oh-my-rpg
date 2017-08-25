const readline = require('readline')
const {
	prettifyJson,
	stylizeString,
} = require('./deps')

/////////////////////////////////////////////////



/////////////////////////////////////////////////

function start_loop() {

	const COMMANDS_FOR_SCREEN = {
		'*': [
			{ key: 'q', description: 'quit', cb() { console.log('good bye'); process.exit() }}
		],
		main: [
			{ key: 'p', description: 'play', cb() { console.log('play') }},
			{ key: 'i', description: 'inventory', cb() { console.log('inventory'); switch_screen('inventory') }},
		],
		inventory: [
			{ key: 'a', description: 'item 1', cb() { console.log('select item 1') }},
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

	if (!process.stdout.isTTY)
		throw new Error('start_loop: current term is not a tty !')

	readline.emitKeypressEvents(process.stdin)
	process.stdin.setRawMode(true)

	let current_screen_id = 'main'
	function switch_screen(id) {
		current_screen_id = id
		//console.log(get_commands_for_screen(current_screen_id))
		get_commands_for_screen(current_screen_id).forEach(render_command)
	}
	switch_screen('main')

	process.stdin.on('keypress', (str, key_pressed) => {
		console.log({current_screen_id})
		if (!key_pressed)
			throw new Error('keypress: Y U no key?!')

		if (key_pressed.ctrl) // ctrl C, ctrl D, whatever
			process.kill(process.pid, 'SIGINT');

		if (!current_screen_id)
			throw new Error('keypress: unknown current screen!')

		if (!COMMANDS_FOR_SCREEN[current_screen_id])
			throw new Error('keypress: no keymap for current screen!')

		const keymap = get_commands_for_screen(current_screen_id).find(({key}) => key === key_pressed.name)
		console.log(key_pressed, keymap)
		if (keymap)
			keymap.cb()
	})

}

module.exports = {
	start_loop
}
