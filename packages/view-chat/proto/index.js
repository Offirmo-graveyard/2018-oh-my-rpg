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

// http://stackoverflow.com/a/1917041/587407
function get_shared_start(array) {
	if (array.length <= 1) return ''

	const A = array.concat().sort()
	const a1 = A[0]
	const a2 = A[A.length - 1]
	const L = a1.length

	let i = 0
	while (i < L && a1.charAt(i) === a2.charAt(i)) { i++ }

	return a1.substring(0, i)
}

function prettify_params_for_debug() {
	return indent_string(
			prettify_json.apply(null, arguments),
			1,
			{indent: '	'}
		)
}

function alpha_to_nice_unicode(char) {
	return '' + char + '\u20e3'
}


function tty_chat_ui_factory() {
	if (DEBUG) console.log('↘ tty_chat_ui_factory()')
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


	function decorate_choices_with_key(step) {
		const unhinted_choices = step.choices.filter(choice => !choice.key_hint)
		const common_value_part = get_shared_start(unhinted_choices.map(choice => choice.msg_cta.toLowerCase()))
		step.choices.forEach(choice => {
			const key = choice.key_hint || {
				name: choice.msg_cta.toLowerCase().slice(common_value_part.length)[0]
			}

			choice._ui_tty = {key}
		})
		const allowed_keys = step.choices.map(choice => choice._ui_tty.key.name).join(',')
		if (DEBUG) console.log('  available choices: ' + allowed_keys)
	}



	function render_choice(choice) {
		const {msg_cta} = choice
		const {key} = choice._ui_tty
		const nice_key = alpha_to_nice_unicode(key.name)
		return `${nice_key} ${msg_cta}`
	}

	async function display_message({msg, choices = [], side = '→'}) {
		if (DEBUG) console.log(`↘ display_message(\n${prettify_params_for_debug({msg, choices, side})}\n)`)
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
			decorate_choices_with_key({choices})
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
				indent_col_count = MSG_L_INDENT
				break
			case '←':
				indent_col_count = MSG_R_INDENT
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
		if (DEBUG) console.log(`↘ read_string(\n${prettify_params_for_debug(step)}\n)`)
		return new Promise(resolve => {
				//rli.clearLine(process.stdout, 0)
				rli.prompt()

				rli.question('', answer => {
					rli.clearLine(process.stdout, 0)
					answer = String(answer).trim()
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
		if (DEBUG) console.log('↘ read_key_sequence()')
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
		if (DEBUG) console.log('↘ read_choice()')
		const allowed_keys = step.choices.map(choice => choice._ui_tty.key.name).join(',')
		if (DEBUG) console.log('  available choices: ' + allowed_keys)
		let answer = undefined
		while (typeof answer === 'undefined') {
			const key = await read_key_sequence()
			const choice = step.choices.find(choice => choice._ui_tty.key.name === key.name)
			if(!choice) {
				console.log(`[please select a correct choice: ${allowed_keys}]`)
			}
			else {
				answer = choice.value
				// TODO display here ?
				await display_message({
					msg: (choice.msgg_as_user || step.msgg_as_user || (() => choice.msg_cta))(answer),
					// () => choice.msg_cta
					// x => String(x)
					side: '←'
				})
			}
		}
		return answer
	}

	async function read_answer(step) {
		if (DEBUG) console.log('↘ read_answer()')
		switch (step.type) {
			case 'ask_for_string':
				return read_string(step)
			case 'ask_for_choice':
				return read_choice(step)
			/*
			case 'confirm':

			if (step.msgg_confirm) {
				ok = await ask_user_for_confirmation(step.msgg_confirm(answer))
				if (DEBUG) console.log(`↖ ask_user(…) confirmation = "${ok}"`)
			}
			 */
			default:
				throw new Error(`Unsupported step type: "${step.type}"!`)
		}
	}

	async function teardown() {
		if (DEBUG) console.log('↘ teardown()')
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
	if (DEBUG) console.log('↘ factory()')

	const STEP_CONFIRM = uniformize_step({
		msg_main: `Are you sure?`,
		msgg_as_user: ok => ok ? 'Yes, I confirm.' : 'No, I changed my mind…',
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

	function uniformize_step(step) {
		try {

			if (step.type === 'ask_for_confirmation' && step !== STEP_CONFIRM)
				step = {
					...STEP_CONFIRM,
					...step,
				}

			if (!step.msg_main)
				throw new Error('Step is missing main message!')

			if (!step.type) {
				if (!step.choices)
					throw new Error('Step type is unknown and not inferrable!')

				step.type = 'ask_for_choice'
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
			return choice
		}
		catch (e) {
			console.error(prettify_json(choice))
			throw e
		}
	}

	async function ask_user_for_confirmation(msg) {
		if (DEBUG) console.log(`↘ ask_user_for_confirmation(${msg})`)
		await ui.display_message({
			msg: msg || STEP_CONFIRM.msg_main,
			choices: STEP_CONFIRM.choices
		})
		let ok = await ui.read_answer(STEP_CONFIRM)
		if (!ok)
			await ui.display_message({ msg: 'No worries, let’s try again...' })
		return ok
	}

	async function ask_user(step) {
		if (DEBUG) console.log(`↘ ask_user(\n${prettify_params_for_debug(step)}\n)`)
		let ok = true
		let answer = ''
		do {
			await ui.display_message({msg: step.msg_main, choices: step.choices})
			answer = await ui.read_answer(step)
			if (DEBUG) console.log(`↖ ask_user(…) answer = "${answer}"`)
		} while (!ok)
		if (step.msgg_acknowledge)
			await ui.display_message({msg: step.msgg_acknowledge(answer)})
		return answer
	}

	async function execute_step(step) {
		if (DEBUG) console.log(`↘ execute_step(\n${prettify_params_for_debug(step)}\n)`)

		switch (step.type) {
			case 'simple_message':
				return ui.display_message({
					msg: step.msg_main,
				})
			case 'ask_for_confirmation':
			case 'ask_for_string':
			case 'ask_for_choice': {
				const answer = await ask_user(step)
				if (step.callback)
					await step.callback(answer)
				break
			}
			default:
				throw new Error(`Unsupported step type: "${step.type}"!`)
		}
	}

	async function start() {
		if (DEBUG) console.log('↘ start()')
		try {
			await ui.setup()
			let should_exit = false
			let last_step = undefined
			let last_answer = undefined
			do {
				const {value: raw_step, done} = await gen_next_step.next({last_step, last_answer})
				//console.log({raw_step, done})
				if (done) {
					should_exit = true
					continue
				}

				const step = uniformize_step(raw_step)
				await execute_step(step)
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
			type: 'simple_message',
			msg_main: `Welcome. I'll have a few questions…`,
		},
		{
			type: 'ask_for_string',
			msg_main: `What's your name?`,
			//validator: null, // TODO
			msgg_as_user: value => `My name is "${value}".`,
			msgg_acknowledge: name => `Thanks for the answer, ${name}!`,
			callback: value => { state.name = value }
		},
		{
			type: 'ask_for_string',
			msg_main: `What city do you live in?`,
			msgg_as_user: value => `I live in "${value}".`,
			msgg_acknowledge: value => `${value}, a fine city indeed!`,
			callback: value => { state.city = value }
		},
		{
			type: 'simple_message',
			msg_main: `Please wait for a moment...`,
		},
		// TODO wait with feedback
		{
			type: 'delay',
			msg_main: `Please wait for a moment...`,
		},
		{
			msg_main: `Make your choice`,
			callback: value => { state.mode = value },
			choices: [
				{
					msg_cta: 'Choice 1',
					value: 1,
				},
				{
					msg_cta: 'Choice 2',
					value: 2,
				},
			]
		}
	]

	/*
		{
			type: 'ask_for_confirmation',
			//msgg_main: name => `Do you confirm?`,
			callback: value => { }
		},
	 */
}

async function get_next_step2() {

	const MAIN_MODE = {
		msg_main: `What do you want to do?`,
		callback: value => state.mode = value,
		choices: [
			{
				msg_cta: 'Play',
				value: 'play',
				msgg_as_user: () => 'Let’s play!',
			},
			{
				msg_cta: 'Manage Inventory',
				value: 'inventory',
				msgg_as_user: () => 'Let’s sort out my stuff.',
			},
			{
				msg_cta: 'Manage Character',
				value: 'character',
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
