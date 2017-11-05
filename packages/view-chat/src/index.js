"use strict";

const { prettify_json } = require('./libs')
const { prettify_params_for_debug } = require('./utils')


function factory({DEBUG, gen_next_step, ui}) {
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
				//msgg_acknowledge: () => `OK.`, Is that really mandatory? Next message may be enough of a reaction
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

		let acknowledged = false
		if (step.choices) {
			const selected_choice = step.choices.find(choice => choice.value === answer)
			if (selected_choice.msgg_acknowledge) {
				await ui.display_message({msg: selected_choice.msgg_acknowledge(answer)})
				acknowledged = true
			}
		}
		if (!acknowledged && step.msgg_acknowledge) {
			await ui.display_message({msg: step.msgg_acknowledge(answer)})
			acknowledged = true
		}
		if (!acknowledged) {
			//const err = new Error('CNF acknowledge msg')
			//err.step = step
			//throw err
			// Fine!
		}

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

				let reported = false
				if (step.choices) {
					const selected_choice = step.choices.find(choice => choice.value === answer)
					if (selected_choice.callback) {
						await selected_choice.callback(answer)
						reported = true
					}
				}
				if (!reported && step.callback) {
					await step.callback(answer)
					reported = true
				}
				if (!reported) {
					const err = new Error('CNF report ask for result')
					err.step = step
					throw err
				}

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



module.exports = {
	factory,
}
