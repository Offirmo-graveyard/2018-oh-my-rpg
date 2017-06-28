require('@offirmo/cli-toolbox/stdout/clear-cli')()

const _ = require('lodash')

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
	get_ansi_color_for_quality,
	render_weapon,
	render_armor,
	render_item,
	render_characteristics,
	render_equipment,
	render_inventory,
	render_adventure,
} = require('@oh-my-rpg/view-text')

//console.log(boxify('𝐓he 𝐁oring 𝐑𝐏𝐆 𝑟𝑒𝑙𝑜𝑎𝑑𝑒𝑑 ', {padding: 1, margin: 1, borderStyle: 'double'}))
console.log(boxify('𝐓𝐡𝐞 𝐁𝐨𝐫𝐢𝐧𝐠 𝐑𝐏𝐆 𝑟𝑒𝑙𝑜𝑎𝑑𝑒𝑑 ', {padding: 2, margin: 1, borderStyle: 'double', borderColor: 'red'}))


let state = factory()
state = play(state)
//console.log(prettifyJson(state))

console.log(
	stylizeString.bold('🙂  CHARACTERISTICS 💗\n')
	+ render_characteristics(state.characteristics)
)

console.log(boxify(
	stylizeString.bold('🙂  CHARACTERISTICS 💗\n')
	+ render_characteristics(state.characteristics),
	{borderStyle: 'single'}
	))
console.log(boxify(stylizeString.bold('⚔  EQUIPMENT 🛡 \n') + render_equipment(state.inventory), {borderStyle: 'single'}))
console.log(boxify(stylizeString.bold('📦  INVENTORY 💰 \n') + render_inventory(state.inventory), {borderStyle: 'single'}))
console.log(render_adventure(state.last_adventure))



//console.log(arrayify(data))


//console.log(columnify(data))
