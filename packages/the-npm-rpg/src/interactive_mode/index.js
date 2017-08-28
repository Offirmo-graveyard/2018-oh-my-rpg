const readline = require('readline')
const {
	prettifyJson,
	stylizeString,
} = require('../deps')

/////////////////////////////////////////////////

const ui = require('./state')
const { play, equip_item } = require('../actions')
const { render_interactive_before, render_interactive_after } = require('../screens')


/////////////////////////////////////////////////

function start_loop(options) {
	return new Promise((resolve, reject) => {
		if (!process.stdout.isTTY)
			throw new Error('start_loop: current term is not a tty !')

		let ui_state = ui.factory({options})

		const COMMANDS_FOR_SCREEN = {
			'*': [
				{
					key: '!',
					key_for_display: 'Ctrl+C',
					description: 'quit (game is automatically saved)',
					cb() {
						console.log('good bye!')
						resolve()
					}
				}
			],
			adventure: [
				{
					key: 'p',
					description: 'Play',
					cb() { play(options) }
				},
				{
					key: 'i',
					description: 'Inventory',
					cb() { ui_state = ui.switch_screen(ui_state, 'inventory') }
				},
				{
					key: 'c',
					description: 'Character sheet',
					cb() { ui_state = ui.switch_screen(ui_state, 'character') }
				},
			],
			inventory: [
				{
					key: '[a-t]',
					key_for_display: 'a↔t',
					description: 'select inventory slot a...t',
					cb(key) {
						const selected_item_index = key.charCodeAt(0) - 97
						ui_state = ui.select_item(ui_state, selected_item_index)
						ui_state = ui.switch_screen(ui_state, 'inventory_select')
					},
				},
				{
					key: 'x',
					description: 'back to adventure!',
					cb() { ui_state = ui.switch_screen(ui_state, 'adventure') }
				},
			],
			inventory_select: [
				{
					key: 'e',
					description: 'equip',
					cb() { equip_item(options, ui_state.selected_item_coordinates) }
				},
				{
					key: 's',
					description: 'sell',
					cb() { console.log(`sell item TODO`) }
				},
				{
					key: 'x',
					description: 'do nothing, back to inventory',
					cb() { ui_state = ui.switch_screen(ui_state, 'inventory') }
				},
			],
			character: [
				{
					key: 'r',
					description: 'Rename hero',
					cb() {
						console.error('TODO')
					},
				},
				{
					key: 'x',
					description: 'exit',
					cb() { ui_state = ui.switch_screen(ui_state, 'adventure') }
				},
			],
		}

		function get_commands_for_screen(screen_id) {
			return [
				...COMMANDS_FOR_SCREEN[screen_id],
				...COMMANDS_FOR_SCREEN['*'],
			]
		}

		function render_command({key, key_for_display,description}) {
			console.log(`${stylizeString.inverse(' ' + (key_for_display?key_for_display:key).toUpperCase() + ' ')} → ${description}`)
		}

		readline.emitKeypressEvents(process.stdin)
		process.stdin.setRawMode(true)

		function render_commands() {
			//console.log(get_commands_for_screen(current_screen_id))
			console.log('What do you want to do?')
			get_commands_for_screen(ui_state.current_screen_id).forEach(render_command)
		}
		render_interactive_before(ui_state)
		render_commands()

		//if (options.verbose) console.log('current UI state:\n-------\n', prettifyJson(ui_state), '\n-------\n')
		process.stdin.on('keypress', (str, key_pressed) => {
			if (options.verbose) console.log(`key pressed:\n${prettifyJson(key_pressed)}\n`)

			if (!key_pressed)
				throw new Error('keypress: Y U no key?!')

			if (key_pressed.ctrl) // ctrl C, ctrl D, whatever
				process.kill(process.pid, 'SIGINT');

			const {current_screen_id} = ui_state
			if (!current_screen_id)
				throw new Error('keypress: unknown current screen!')

			if (!COMMANDS_FOR_SCREEN[current_screen_id])
				throw new Error('keypress: no key mappings for current screen!')

			const current_keymap = get_commands_for_screen(current_screen_id).find(({key}) => !!key_pressed.name.match(key))
			if (!current_keymap) {
				console.log(`unrecognized key: ${key_pressed.name}`)
			}
			else {
				render_interactive_before(ui_state)
				if (options.verbose) console.log(`key pressed:\n${prettifyJson(key_pressed)}\n mapped to:\n${prettifyJson(current_keymap)}\n`)
				current_keymap.cb(key_pressed.name)
				render_interactive_after(ui_state)
				render_commands()
				//if (options.verbose) console.log('current UI state:\n-------\n', prettifyJson(ui_state), '\n-------\n')
			}
		})
	})
}

module.exports = {
	start_loop
}
