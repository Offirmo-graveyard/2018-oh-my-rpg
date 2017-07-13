require('@offirmo/cli-toolbox/stdout/clear-cli')()

const _ = require('lodash')
const Conf = require('conf')

const displayInAsciiArtFont = require('@offirmo/cli-toolbox/stdout/display_in_ascii_art_font')
const prettifyJson = require('@offirmo/cli-toolbox/string/prettify-json')
const boxify = require('@offirmo/cli-toolbox/string/boxify')
const stylizeString = require('@offirmo/cli-toolbox/string/stylize')
const json = require('@offirmo/cli-toolbox/fs/json')
const arrayify = require('@offirmo/cli-toolbox/string/arrayify')
const columnify = require('@offirmo/cli-toolbox/string/columnify')

const {
	factory,
	play,
} = require('@oh-my-rpg/the-boring-rpg')

const {
	render_weapon,
	render_armor,
	render_item,
	render_characteristics,
	render_equipment,
	render_inventory,
	render_wallet,
	render_adventure,
} = require('@oh-my-rpg/view-text')

let verbose = false

//console.log(boxify('𝐓he 𝐁oring 𝐑𝐏𝐆 𝑟𝑒𝑙𝑜𝑎𝑑𝑒𝑑 ', {padding: 1, margin: 1, borderStyle: 'double'}))
//console.log(boxify('𝐓𝐡𝐞 𝐁𝐨𝐫𝐢𝐧𝐠 𝐑𝐏𝐆 𝑟𝑒𝑙𝑜𝑎𝑑𝑒𝑑 ', {padding: 2, margin: 1, borderStyle: 'double', borderColor: 'red'}))
console.log(boxify(`   ${stylizeString.bold('The Boring RPG 𝑟𝑒𝑙𝑜𝑎𝑑𝑒𝑑')} \n\nhttp://www.online-adventur.es`, {padding: 1, margin: 0, borderStyle: 'double', borderColor: 'red'}))
console.log('v0.x.0')

const config = new Conf({
	configName: 'state',
	defaults: factory(),
})

if (verbose) console.log('config', prettifyJson(config))

let state = config.store
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
	stylize: stylize_tbrpg_string,
	last_adventure: state.last_adventure
}


console.log(stylizeString.bold(`\n============ Click #${state.good_click_count} ============\n`))
console.log(render_adventure(state.last_adventure))
//console.log(prettifyJson(state.last_adventure))

function noboxify(s) { return '\n' + s }

console.log(noboxify(
	stylizeString.bold('🙂  CHARACTERISTICS 💗\n')
	+ render_characteristics(state.characteristics, rendering_options),
	{borderStyle: 'single'}
))
console.log(noboxify(
	stylizeString.bold('⚔  ACTIVE EQUIPMENT 🛡 \n')
	+ render_equipment(state.inventory, rendering_options),
	{borderStyle: 'single'}
))
console.log(noboxify(
	stylizeString.bold('📦  INVENTORY 💰 \n')
	+ render_wallet(state.wallet, rendering_options)
	+ '\n'
	+ render_inventory(state.inventory, rendering_options),
	{borderStyle: 'single'}
))

console.log('You can play again in...')

config.set(state)
