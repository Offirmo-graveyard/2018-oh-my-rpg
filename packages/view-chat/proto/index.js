#!/usr/bin/env node
'use strict';

const readline = require('readline')
const termSize = require('term-size')



const {
	prettifyJson,
	indent_string,
	wrap_string,
	enclose_in_box,
} = require('./libs')

function factory({get_next_step}) {
	const DEBUG = false
	const state = {
		keyPressCallback: null
	}

	if (!process.stdout.isTTY)
		throw new Error('start_loop: current term is not a tty !')
	readline.emitKeypressEvents(process.stdin)
	const rli = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})
	rli.on('line', (input) => {
		console.log(`Received line: ${input}`);
	})
	process.stdin.on('keypress', (str, key_pressed) => {
		if (!state.keyPressCallback)
			return

		if (DEBUG) console.log(`key pressed:\n${prettifyJson(key_pressed)}\n`)
		if (!key_pressed) {
			if (DEBUG) console.error('keypress: Y U no key?!')
			return
		}

		key_pressed.name = key_pressed.name ||  key_pressed.sequence
		state.keyPressCallback(key_pressed)
	})

	const {columns: TERM_WIDTH} = termSize()
	if (DEBUG) console.log({TERM_WIDTH})
	if (TERM_WIDTH < 40)
		throw new Error('Your terminal is too narrow!')
	const USED_WIDTH = Math.min(TERM_WIDTH, 120)
	const MSG_WIDTH = USED_WIDTH <= 60
		? USED_WIDTH
		: Math.max(60, Math.round(USED_WIDTH * .5))
	if (DEBUG) console.log({USED_WIDTH, MSG_WIDTH})
	const LINE = '────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────'.slice(0, MSG_WIDTH - 2)
	const MSG_L_INDENT = Math.round((TERM_WIDTH - USED_WIDTH) / 2)
	const MSG_R_INDENT = MSG_L_INDENT + USED_WIDTH - MSG_WIDTH

	// TODO
	// global exit key



	function uniformize_step(step) {
		try {
			if (!step.msg_instructions)
				throw new Error('Step is missing instructions message!')
			if (!step.type) {
				if (!step.choices)
					throw new Error('Step type is unknown!')
				step.type = 'choices'
			}
			step = {
				msg_acknowledge: () => `OK.`,
				validator: null,
				choices: [],
				...step
			}

			step.choices = step.choices.map(uniformize_choice)
			return step
		}
		catch (e) {
			console.error(prettifyJson(step))
			throw e
		}
	}

	function uniformize_choice(choice) {
		try {
			if (!choice.hasOwnProperty('value') || typeof choice.value === 'undefined')
				throw new Error('Choice has no value!')
			choice.msg = choice.msg || String(choice.value)
			const key = (choice.key_hint || choice.msg[0] || choice.value[0]).toLowerCase()
			choice = {
				key,
				...choice
			}
			return choice
		}
		catch (e) {
			console.error(prettifyJson(choice))
			throw e
		}
	}

	const STEP_CONFIRM = uniformize_step({
		msg_instructions: `Are you sure?`,
		msg_as_user: ok => ok ? 'Yes, I confirm.' : 'No, I changed my mind.',
		choices: [
			{
				msg: 'Yes, confirm',
				value: true,
			},
			{
				msg: 'No, cancel',
				value: false,
			},
		]
	})

	const LETTER_A_CODEPOINT = 'a'.codePointAt(0)
	const SQUARED_LATIN_CAPITAL_LETTER_A_CODEPOINT = 0x1F130
	function render_choice(choice) {
		const {key, msg} = choice
		const nice_key = String.fromCodePoint(key.codePointAt(0) - LETTER_A_CODEPOINT + SQUARED_LATIN_CAPITAL_LETTER_A_CODEPOINT)
		return `${nice_key}  ${msg}`
	}

	async function display_message(msg, choices, options = {}) {
		options = {
			side: 'left',
			...options
		}

		msg = wrap_string(msg, MSG_WIDTH - 1)
		msg = indent_string(msg, 1, {indent: '│'})

		const hasChoices = choices && choices.length > 0
		if (!hasChoices) {
			msg += '\n└─' + LINE
		}
		else {
			msg += '\n└┬' + LINE
			choices.forEach((choice, index) => {
				if (index === choices.length - 1)
					msg += '\n └' + render_choice(choice)
				else
				msg += '\n ├' + render_choice(choice)
			})
		}

		msg = indent_string(
			msg,
			options.side === 'left' ? MSG_L_INDENT : MSG_R_INDENT,
			{indent: ' '}
			)

		console.log(msg)
	}

	function read_string(step) {
		return new Promise(resolve => {
				rli.clearLine(process.stdout, 0)
				rli.question('', answer => {
					rli.clearLine(process.stdout, 0)
					if (DEBUG) console.log(`[You entered: "${answer}"]`)
					resolve(answer)
				})
			})
			.then(answer => {
				if (step.msg_as_user)
					return display_message(step.msg_as_user(answer), [], {side: 'right'})
						.then(() => answer)

				return answer
			})
	}

	function read_key_sequence() {
		return new Promise(resolve => {
			process.stdin.setRawMode(true)
			//readline.moveCursor(stream, MSG_R_INDENT, 0)
			state.keyPressCallback = key => {
				process.stdin.setRawMode(false)
				state.keyPressCallback = null
				rli.clearLine(process.stdout, 0)
				resolve(key)
			}
		})
		.catch(() => process.stdin.setRawMode(false))
	}

	async function read_single_choice(step) {
		let answer = undefined
		while (typeof answer === 'undefined') {
			const key = await read_key_sequence()
			const choice = step.choices.find(choice => choice.key === key.name)
			if(!choice)
				console.log('[please select a correct choice]')
			else {
				answer = choice.value
				await display_message((choice.msg_as_user || step.msg_as_user)(answer), [], {side: 'right'})
			}
		}
		return answer
	}

	async function read_answer(step) {
		switch (step.type) {
			case 'string':
				return read_string(step)
			case 'choices':
				return read_single_choice(step)
			default:
				throw new Error(`Unsupported step type: "${step.type}"!`)
		}
	}

	async function ask_user_for_confirmation(msg) {
		await display_message(msg || STEP_CONFIRM.msg_instructions, STEP_CONFIRM.choices)
		let ok = await read_single_choice(STEP_CONFIRM)
		if (!ok)
			await display_message('No worries, let’s try again...')
		return ok
	}

	async function ask_user(step) {
		let ok = true
		let answer = ''
		do {
			await display_message(step.msg_instructions, step.choices)
			answer = await read_answer(step)
			if (step.msg_confirm)
				ok = await ask_user_for_confirmation(step.msg_confirm(answer))
		} while (!ok)
		if (step.msg_acknowledge)
			await display_message(step.msg_acknowledge(answer))
		return answer
	}

	async function start() {
		try {
			console.log('')
			let step
			do {
				step = uniformize_step(await get_next_step())
				const answer = await ask_user(step)
				if (step.callback)
					await step.callback(answer)
			} while(step.type !== 'exit')
			rli.close()
		}
		catch (e) {
			rli.close()
			throw e
		}
	}

	return {
		start,
	}
}


const state = {
	mode: 'main',
	name: undefined,
}

async function get_next_step() {
	const GET_NAME = {
		msg_instructions: `What's your name?`,
		type: 'string',
		validator: null, // TODO
		msg_as_user: name => `My name is "${name}".`,
		msg_confirm: name => `Do you confirm?`,
		msg_acknowledge: name => `Thanks for the answer, ${name}!`,
		callback: name => state.name = name
	}

	const MAIN_MODE = {
		msg_instructions: `What do you want to do?`,
		callback: value => state.mode = value,
		choices: [
			{
				msg: 'Play',
				value: 'play',
				key_hint: 'p',
				msg_as_user: () => 'Let’s play!',
			},
			{
				msg: 'Manage Inventory',
				value: 'inventory',
				key_hint: 'i',
				msg_as_user: () => 'Let’s sort out my stuff.',
			},
			{
				msg: 'Manage Character',
				value: 'character',
				key_hint: 'c',
				msg_as_user: () => 'Let’s see how I’m doing!',
			},
		]
	}

	return state.name
		? MAIN_MODE
		: GET_NAME
	//return GET_NAME
}


const chat = factory({get_next_step})
chat.start()
	.then(console.log)
	.catch(console.error)
