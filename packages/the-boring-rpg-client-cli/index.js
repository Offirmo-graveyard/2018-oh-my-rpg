require('@offirmo/cli-toolbox/stdout/clear-cli')()

const displayInAsciiArtFont = require('@offirmo/cli-toolbox/stdout/display_in_ascii_art_font')
displayInAsciiArtFont('TBRPG', { font: 'simple' })

const vorpal = require('@offirmo/cli-toolbox/framework/vorpal')
const prettifyJson = require('@offirmo/cli-toolbox/string/prettify-json')


const stylizeString = require('@offirmo/cli-toolbox/string/stylize')
const _ = require('@offirmo/cli-toolbox/lodash')

const json = require('@offirmo/cli-toolbox/fs/json')

//return json.read(__dirname + '/../../package.json').then(data => console.log(data.repository))


const {
	factory,
	play,
} = require('@oh-my-rpg/the-boring-rpg')

let state = factory()
state = play(state)
console.log(prettifyJson(state))

const arrayify = require('@offirmo/cli-toolbox/string/arrayify')

const data = {
	"commander@0.6.1": 1,
	"minimatch@0.2.14": 3,
	"mkdirp@0.3.5": 2,
	"sigmund@1.0.0": 3
}

console.log(arrayify(data))

const columnify = require('@offirmo/cli-toolbox/string/columnify')

//console.log(columnify(data))
