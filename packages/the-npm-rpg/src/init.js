const Conf = require('conf')
const Globalize = require('globalize')
const CLDRData = require('cldr-data')

const { migrate_to_latest } = require('@oh-my-rpg/state-the-boring-rpg')
const { prettifyJson } = require('./deps')

/////////////////////////////////////////////////

function init_globalize() {
	const en = Object.assign({},
		require('@oh-my-rpg/data/src/adventure_archetype/i18n').en
	)

	Globalize.load(CLDRData.entireSupplemental())
	Globalize.load(CLDRData.entireMainFor('en'))
	//Globalize.loadTimeZone(require('iana-tz-data'))
	Globalize.loadMessages({en})

	return Globalize('en')
}


function init_savegame({verbose}) {
	const config = new Conf({
		configName: 'state',
		defaults: { version: -1 }, // will trigger a reset to default through the migration system
	})

	if (verbose) console.log('config path:', config.path)
	if (verbose) console.log('loaded state\n', prettifyJson(config.store))

	const state = migrate_to_latest(config.store)
	if (verbose) console.log('migrated state\n', prettifyJson(state))

	config.clear()
	config.set(state)

	return config
}

/////////////////////////////////////////////////

module.exports = {
	init_globalize,
	init_savegame,
}
