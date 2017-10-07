#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

const { factory: tty_chat_ui_factory } = require('./ui_tty')
const { factory: chat_factory } = require('./chat')

const DEBUG = false


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
		/*{
			type: 'delay',
			msg_main: `Please wait for a moment...`,
		},*/
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


const chat = chat_factory({
	DEBUG,
	gen_next_step: get_next_step1(),
	ui: process.stdout.isTTY
		? tty_chat_ui_factory({DEBUG})
		: no_ui,
})

chat.start()
	.then(console.log)
	.catch(console.error)
