#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

const readline = require('readline')
const termSize = require('term-size')

const MANY_BOX_HORIZ = '────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────'
const MANY_SPACES = '                                                                                                                                                                  '

const {
	prettify_json,
	indent_string,
	wrap_string,
	enclose_in_box,
} = require('./libs')

const DEBUG = false

function prettify_params_for_debug() {
	return indent_string(
			prettify_json.apply(null, arguments),
			1,
			{indent: '	'}
		)
}

function tty_chat_ui_factory() {
	console.log('↘ tty_chat_ui_factory()')
	const state = {
		is_closing: false,
		keypress_callback: null,
	}

	if (!process.stdout.isTTY)
		throw new Error('start_loop: current term is not a tty !')

	const {columns: TERM_WIDTH} = termSize()
	if (DEBUG) console.log({TERM_WIDTH})
	if (TERM_WIDTH < 40)
		throw new Error('Your terminal is too narrow!')
	const USED_WIDTH = Math.min(TERM_WIDTH, 80)
	const MSG_WIDTH = USED_WIDTH <= 50
		? USED_WIDTH
		: Math.max(50, Math.round(USED_WIDTH * .5))
	if (DEBUG) console.log({USED_WIDTH, MSG_WIDTH})
	const MSG_BASELINE = MANY_BOX_HORIZ.slice(0, MSG_WIDTH - 2)
	const MSG_L_INDENT = Math.round((TERM_WIDTH - USED_WIDTH) / 2)
	const MSG_R_INDENT = MSG_L_INDENT + USED_WIDTH - MSG_WIDTH
	const PROMPT = MANY_SPACES.slice(0, MSG_L_INDENT + 2)

	process.stdin.setRawMode(true)
	readline.emitKeypressEvents(process.stdin)

	const rli = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: PROMPT,
	})

	rli.on('line', (input) => {
		if (DEBUG) console.log(`[Received line: ${input}]`);
	})

	rli.on('close', () => {
		if (DEBUG) console.log(`[Received close]`);
		state.is_closing = true
	})

	process.stdin.on('keypress', (str, key_pressed) => {
		if (DEBUG) console.log(`[keypress]`);
		if (!state.keypress_callback)
			return
		if (state.is_closing)
			return

		if (DEBUG) console.log(`[key pressed:\n${prettify_json(key_pressed)}\n]`)
		if (!key_pressed) {
			if (DEBUG) console.error('keypress: Y U no key?!')
			return
		}

		key_pressed.name = key_pressed.name || key_pressed.sequence
		state.keypress_callback(key_pressed)
	})
	rli.prompt()
	// TODO
	// global exit key

	const LETTER_A_CODEPOINT = 'a'.codePointAt(0)
	const SQUARED_LATIN_CAPITAL_LETTER_A_CODEPOINT = 0x1F130
	function render_choice(choice) {
		const {key, msg_cta} = choice
		const nice_key = String.fromCodePoint(key.codePointAt(0) - LETTER_A_CODEPOINT + SQUARED_LATIN_CAPITAL_LETTER_A_CODEPOINT)
		return `${nice_key}  ${msg_cta}`
	}

	async function display_message({msg, choices = [], side = '→'}) {
		console.log(`↘ display_message(\n${prettify_params_for_debug({msg, choices, side})}\n)`)
		if (typeof arguments[0] !== 'object')
			throw new Error(`display_message(): incorrect invocation!`)
		if (!msg)
			throw new Error(`display_message(): no msg!`)
		msg = wrap_string(msg, MSG_WIDTH - 1)
		msg = indent_string(msg, 1, {indent: '│'})

		const has_choices = choices && choices.length > 0
		if (!has_choices) {
			msg += '\n└─' + MSG_BASELINE
		}
		else {
			msg += '\n└┬' + MSG_BASELINE
			choices.forEach((choice, index) => {
				if (index === choices.length - 1)
					msg += '\n └' + render_choice(choice)
				else
					msg += '\n ├' + render_choice(choice)
			})
		}

		let indent_col_count = 0
		switch(side) {
			case '→':
				indent_col_count = MSG_R_INDENT
				break
			case '←':
				indent_col_count = MSG_L_INDENT
				break
			case '↔':
			default:
				throw new Error(`display_message(): incorrect side!`)
				break
		}
		msg = indent_string(
			msg,
			indent_col_count,
			{indent: ' '}
		)

		console.log(msg)
	}

	function read_string(step) {
		console.log(`↘ read_string(\n${prettify_params_for_debug(step)}\n)`)
		return new Promise(resolve => {
			//rli.clearLine(process.stdout, 0)
			rli.prompt()

			rli.question('', answer => {
				rli.clearLine(process.stdout, 0)
				if (DEBUG) console.log(`[You entered: "${answer}"]`)
				resolve(answer)
			})
		})
			.then(answer => {
				if (step.msgg_as_user)
					return display_message({
							msg: step.msgg_as_user(answer),
							side: '←'
						})
						.then(() => answer)

				return answer
			})
	}

	function read_key_sequence() {
		console.log('↘ read_key_sequence()')
		return new Promise(resolve => {
			//process.stdin.setRawMode(true)
			rli.prompt()
			state.keypress_callback = key => {
				//process.stdin.setRawMode(false)
				state.keypress_callback = null
				rli.clearLine(process.stdout, 0)
				resolve(key)
			}
		})
			.catch(() => process.stdin.setRawMode(false))
	}

	async function read_choice(step) {
		console.log('↘ read_choice()')
		let answer = undefined
		while (typeof answer === 'undefined') {
			const key = await read_key_sequence()
			const choice = step.choices.find(choice => choice.key === key.name)
			if(!choice)
				console.log('[please select a correct choice]')
			else {
				answer = choice.value
				await display_message({
					msg: (choice.msgg_as_user || step.msgg_as_user)(answer),
					side: '←'
				})
			}
		}
		return answer
	}

	async function read_answer(step) {
		console.log('↘ read_answer()')
		switch (step.type) {
			case 'string':
				return read_string(step)
			case 'choices':
				return read_choice(step)
			default:
				throw new Error(`Unsupported step type: "${step.type}"!`)
		}
	}

	async function teardown() {
		console.log('↘ teardown()')
		rli.close()
	}

	return {
		setup: () => {console.log('')},
		display_message,
		read_answer,
		teardown,
	}
}

function factory({gen_next_step, ui}) {
	console.log('↘ factory()')

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
				msgg_acknowledge: () => `OK.`,
				validator: null,
				choices: [],
				...step
			}

			step.choices = step.choices.map(uniformize_choice)
			return step
		}
		catch (e) {
			console.error(prettify_json(step))
			throw e
		}
	}

	function uniformize_choice(choice) {
		try {
			if (!choice.hasOwnProperty('value') || typeof choice.value === 'undefined')
				throw new Error('Choice has no value!')
			choice.msg_cta = choice.msg_cta || String(choice.value)
			const key = (choice.key_hint || choice.msg_cta[0] || choice.value[0]).toLowerCase()
			choice = {
				key,
				...choice
			}
			return choice
		}
		catch (e) {
			console.error(prettify_json(choice))
			throw e
		}
	}

	const STEP_CONFIRM = uniformize_step({
		msg_instructions: `Are you sure?`,
		msgg_as_user: ok => ok ? 'Yes, I confirm.' : 'No, I changed my mind.',
		choices: [
			{
				msg_cta: 'Yes, confirm',
				value: true,
			},
			{
				msg_cta: 'No, cancel',
				value: false,
			},
		]
	})

	async function ask_user_for_confirmation(msg) {
		console.log(`↘ ask_user_for_confirmation(${msg})`)
		await ui.display_message({
			msg: msg || STEP_CONFIRM.msg_instructions,
			choices: STEP_CONFIRM.choices
		})
		let ok = await ui.read_answer(STEP_CONFIRM)
		if (!ok)
			await ui.display_message({ msg: 'No worries, let’s try again...' })
		return ok
	}

	async function ask_user(step) {
		console.log(`↘ ask_user(\n${prettify_params_for_debug(step)}\n)`)
		let ok = true
		let answer = ''
		do {
			await ui.display_message({msg: step.msg_instructions, choices: step.choices})
			answer = await ui.read_answer(step)
			console.log(`↖ ask_user(…) answer = "${answer}"`)
			if (step.msg_confirm) {
				ok = await ask_user_for_confirmation(step.msg_confirm(answer))
				console.log(`↖ ask_user(…) confirmation = "${ok}"`)
			}
		} while (!ok)
		if (step.msgg_acknowledge)
			await ui.display_message({msg: step.msgg_acknowledge(answer)})
		return answer
	}

	async function execute_step(step) {
		console.log(`↘ execute_step(\n${prettify_params_for_debug(step)}\n)`)
		const answer = await ask_user(step)
		let msgs = []
		if (step.callback) {
			msgs = await step.callback(answer) || []
		}
		msgs.forEach(ui.display_message)
	}

	async function start() {
		console.log('↘ start()')
		try {
			await ui.setup()
			let should_exit = false
			do {
				const {value: raw_step, done} = await gen_next_step.next()
				//console.log({raw_step, done})
				if (done) {
					should_exit = true
				}
				else {
					const step = uniformize_step(raw_step)
					await execute_step(step)
				}
			} while(!should_exit)
			await ui.teardown()
		}
		catch (e) {
			await ui.teardown()
			throw e
		}
	}

	return {
		start,
	}
}



function* get_next_step1() {
	const state = {
		mode: 'main',
		name: undefined,
		city: undefined,
	}

	yield* [
		{
			msg_instructions: `What's your name?`,
			type: 'string',
			validator: null, // TODO
			msgg_as_user: value => `My name is "${value}".`,
			//msg_confirm: name => `Do you confirm?`,
			msgg_acknowledge: name => `Thanks for the answer, ${name}!`,
			callback: value => { state.name = value }
		},
		{
			msg_instructions: `What city do you live in?`,
			type: 'string',
			validator: null, // TODO
			msgg_as_user: value => `I live in "${value}".`,
			msgg_acknowledge: () => `Thanks, wait for a moment...`, // TODO default
			callback: value => { state.city = value }
		},
		{
			msg_instructions: `Make your choice`,
			callback: value => { state.mode = value },
			choices: [
				{
					msg_cta: 'Choice 1',
					value: 1,
					key_hint: '1', // TODO auto
				},
				{
					msg_cta: 'Choice 2',
					value: 2,
					key_hint: '2',
				},
			]
		}
	]
}

async function get_next_step2() {

	const MAIN_MODE = {
		msg_instructions: `What do you want to do?`,
		callback: value => state.mode = value,
		choices: [
			{
				msg_cta: 'Play',
				value: 'play',
				key_hint: 'p',
				msgg_as_user: () => 'Let’s play!',
			},
			{
				msg_cta: 'Manage Inventory',
				value: 'inventory',
				key_hint: 'i',
				msgg_as_user: () => 'Let’s sort out my stuff.',
			},
			{
				msg_cta: 'Manage Character',
				value: 'character',
				key_hint: 'c',
				msgg_as_user: () => 'Let’s see how I’m doing!',
			},
		]
	}

	return state.name
		? MAIN_MODE
		: GET_NAME
	//return GET_NAME
}


const no_ui = {
	setup: () => {},
	display_message: () => {},
	read_answer: () => {},
	teardown: () => {},
}

const chat = factory({
	gen_next_step: get_next_step1(),
	ui: process.stdout.isTTY
		? tty_chat_ui_factory()
		: no_ui,
})
chat.start()
	.then(console.log)
	.catch(console.error)
