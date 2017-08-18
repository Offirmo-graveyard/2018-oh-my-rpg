

const _ = require('lodash')
const Conf = require('conf')
const Globalize = require('globalize')
const CLDRData = require('cldr-data')

const {
	prettifyJson,
	boxify,
	stylizeString,
	wrapLines,
	clearCli,
} = require('./deps')

const en_adventures = require('@oh-my-rpg/data/src/adventure_archetype/i18n').en

const {
	migrate_to_latest,
	play,
} = require('@oh-my-rpg/state-the-boring-rpg')

const {
	render_characteristics,
	render_equipment,
	render_inventory,
	render_wallet,
	render_adventure,
} = require('@oh-my-rpg/view-text')

const { version } = require('../package.json')
const MINIMAL_TERMINAL_WIDTH = 80
const MANY_SPACES = '                                                                                                                                                      '

let verbose = false
clearCli()

Globalize.load(CLDRData.entireSupplemental())
Globalize.load(CLDRData.entireMainFor('en', 'fr'))
//Globalize.loadTimeZone(require('iana-tz-data'))
Globalize.loadMessages({en: en_adventures})


console.log(
	stylizeString.bold('The npm RPG')
	+ ` - v${version} - `
	+ stylizeString.underline('http://www.online-adventur.es/the-npm-rpg')
)

const config = new Conf({
	configName: 'state',
	defaults: { version: -1 }, // will trigger a reset to default through the migration system
})

if (verbose) console.log('config path:', config.path)
if (verbose) console.log('loaded state\n', prettifyJson(config.store))

let state = migrate_to_latest(config.store)
config.clear()
if (verbose) console.log('migrated state\n', prettifyJson(state))

//console.log(prettifyJson(state))

state = play(state)


function stylize_tbrpg_string(style, s) {
	switch(style) {
		case 'item_quality_common':
			return stylizeString.gray(s)
		case 'item_quality_uncommon':
			return stylizeString.green(s)
		case 'item_quality_rare':
			return stylizeString.blue(s)
		case 'item_quality_epic':
			return stylizeString.magenta(s)
		case 'item_quality_legendary':
			return stylizeString.red(s)
		case 'item_quality_artifact':
			return stylizeString.yellow(s)
		case 'change_outline':
			return stylizeString.italic.bold.red(s)
		default:
			return `[XXX unkwown style ${style}]`+ stylizeString.bold.red(s)
	}
}

const rendering_options = {
	mode: 'ansi',
	globalize: Globalize('en'),
	stylize: stylize_tbrpg_string,
	last_adventure: state.last_adventure
}

console.log(
	boxify(''
		+ ('You continue your adventures...' + MANY_SPACES).slice(0, MINIMAL_TERMINAL_WIDTH - 4) + '\n\n'
		+ wrapLines(MINIMAL_TERMINAL_WIDTH - 4)(''
			//+ `Click #${state.good_click_count}\n\n`
			+ stylizeString.bold(render_adventure(state.last_adventure, rendering_options))
		),
		{
			padding: 1,
			borderStyle: 'double',
			borderColor: 'red'
		}
	)
)

function boxifyAlt(position, s) {
	const lines = s.split('\n')
	lines[0] = (lines[0] + MANY_SPACES).slice(0, MINIMAL_TERMINAL_WIDTH - 2)
	const boxified = boxify(lines.join('\n'))
	const boxified_lines = boxified.split('\n').slice(
		(position !== 'top') ? 1 : 0
	)
	if (position !== 'bottom')
		boxified_lines[boxified_lines.length - 1] =
			boxified_lines[boxified_lines.length - 1]
			.replace('└', '├')
			.replace('┘', '┤')

	return boxified_lines.join('\n')
}

/*
console.log(boxifyAlt('top',
	//stylizeString.bold('🙂  CHARACTERISTICS 💗\n')
	stylizeString.bold('CHARACTERISTICS:\n')
	+ render_characteristics(state.avatar, rendering_options),
	{borderStyle: 'single'}
))
console.log(boxifyAlt('middle',
	//stylizeString.bold('⚔  ACTIVE EQUIPMENT 🛡 \n')
	stylizeString.bold('ACTIVE EQUIPMENT:\n')
	+ render_equipment(state.inventory, rendering_options),
	{borderStyle: 'single'}
))

console.log(boxifyAlt('bottom',
	//stylizeString.bold('📦  INVENTORY 💰 \n')
	stylizeString.bold('INVENTORY:\n')
	+ render_wallet(state.wallet, rendering_options)
	+ '\n'
	+ render_inventory(state.inventory, rendering_options),
	{borderStyle: 'single'}
))
*/

//console.log('You can play again in...')
console.log('\n')
console.log(stylizeString.bold(`       That was your adventure #${state.good_click_count}!`))
console.log(stylizeString.bold('👉 👉 👉  Relaunch the-npm-rpg to continue your adventures! ⚔ 💰 🎁  👈 👈 👈 '))
console.log(stylizeString.bold('       You will get stronger and stronger!'))
console.log('\n')

// TODO print advices (equip, sell...)
config.set(state)
