const readline = require('readline')
const {
	prettifyJson,
	stylizeString,
} = require('../deps')
const { ask_question: raw_ask_question } = require('./ask_question')

/////////////////////////////////////////////////

const ui = require('./state')
const { play, equip_item, rename_avatar, change_class } = require('../actions')
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
						// we'll never arrive here anyway...
						console.log('good bye!')
						resolve()
					}
				}
			],
			adventure: [
				{
					key: 'p',
					strong: true,
					description: 'Play',
					cb() { play(options) }
				},
				{
					key: 'c',
					description: 'Character sheet (rename, change class...)',
					cb() { ui_state = ui.switch_screen(ui_state, 'character') }
				},
				{
					key: 'i',
					description: 'Inventory (equip, sell...)',
					cb() { ui_state = ui.switch_screen(ui_state, 'inventory') }
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
					key: 'c',
					description: 'Change hero class',
					cb() { ui_state = ui.switch_screen(ui_state, 'character_class_select') },
				},
				{
					key: 'r',
					description: 'Rename hero',
					cb() {
						// TODO allow aborting!
						return ask_question('Under which name do you want to make history and be remembered forever?')
							.then(new_name => {
								rename_avatar(options, new_name)
							})
					},
				},
				{
					key: 'x',
					description: 'go back to adventure',
					cb() { ui_state = ui.switch_screen(ui_state, 'adventure') }
				},
			],
			character_class_select: [
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

		function render_command({key, key_for_display, description, strong}) {
			const icon = !!strong
				? stylizeString.red.bold('→')
				: stylizeString.blue('→')
			console.log(icon + ` ${stylizeString.inverse(' ' + (key_for_display?key_for_display:key).toUpperCase() + ' ')} → ${description}`)
		}

		readline.emitKeypressEvents(process.stdin)
		process.stdin.setRawMode(true)

		function ask_question(q) {
			process.stdin.setRawMode(false)
			ui_state.ignore_key_events = true
			return raw_ask_question(q)
				.then(answer => {
					process.stdin.setRawMode(true)
					ui_state.ignore_key_events = false
					return answer
				})
				.catch(e => {
					process.stdin.setRawMode(true)
					ui_state.ignore_key_events = false
					throw e
				})
		}

		function render_commands() {
			//console.log(get_commands_for_screen(current_screen_id))
			console.log('What do you want to do?')
			get_commands_for_screen(ui_state.current_screen_id).forEach(render_command)
		}
		render_interactive_before(ui_state)
		render_commands()

		//if (options.verbose) console.log('current UI state:\n-------\n', prettifyJson(ui_state), '\n-------\n')
		process.stdin.on('keypress', (str, key_pressed) => {
			if (options.verbose && !ui_state.ignore_key_events)
				console.log(`key pressed:\n${prettifyJson(key_pressed)}\n`)

			if (key_pressed.ctrl) {// ctrl C, ctrl D, whatever
				if (options.verbose) console.log(`Ctrl + key pressed:\n${prettifyJson(key_pressed)}\nExiting...`)
				return resolve()
			}

			if (ui_state.ignore_key_events) return;

			if (!key_pressed)
				return console.error('keypress: Y U no key?!')

			const {current_screen_id} = ui_state
			if (!current_screen_id)
				throw new Error('keypress: unknown current screen!')

			if (!COMMANDS_FOR_SCREEN[current_screen_id])
				throw new Error('keypress: no key mappings for current screen!')

			const key = key_pressed.name || key_pressed.sequence
			if (!key)
				return console.error('keypress: could not read pressed key?!')

			const current_keymap = get_commands_for_screen(current_screen_id)
				.find(({key: command_key}) => !!key.match(command_key))
			if (!current_keymap) {
				console.log(`unrecognized key: "${key}"`)
			}
			else {
				render_interactive_before(ui_state)
				if (options.verbose) console.log(`key pressed:\n${prettifyJson(key_pressed)}\nmapped to:\n${prettifyJson(current_keymap)}\n`)
				const res = current_keymap.cb(key)
				Promise.resolve(res)
					.then(() => {
						if (options.verbose) console.log(`[action resolved]`)
						render_interactive_after(ui_state)
						render_commands()
						//if (options.verbose) console.log('current UI state:\n-------\n', prettifyJson(ui_state), '\n-------\n')
					})
			}
		})
	})
}

module.exports = {
	start_loop
}
