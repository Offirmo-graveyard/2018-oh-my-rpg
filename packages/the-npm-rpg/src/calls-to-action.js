const { stylizeString } = require('./deps')

/////////////////////////////////////////////////

//console.log('You can play again in...') TODO

function cta_relaunch_game() {
	console.log('\n')
	//console.log(stylizeString.bold(`       That was your adventure #${state.good_click_count}!`))
	console.log(stylizeString.bold('👉 👉 👉  Relaunch the-npm-rpg to continue your adventures! ⚔ 💰 🎁  👈 👈 👈 '))
	console.log(stylizeString.bold('       You will get stronger and stronger!'))
	console.log('\n')
}



// TODO print advices (equip, sell...)


/////////////////////////////////////////////////

module.exports = {
	cta_relaunch_game,
}
