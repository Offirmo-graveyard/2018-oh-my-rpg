import { xxx_internal_reset_prng_cache } from '@oh-my-rpg/state-prng'
import { ALL_GOOD_ADVENTURE_ARCHETYPES } from '@oh-my-rpg/logic-adventures'
import {
	Adventure,
	factory,
	play,
} from '@oh-my-rpg/state-the-boring-rpg'

const { rich_text_to_ansi } = require('../../../the-npm-rpg/src/utils/rich_text_to_ansi')

import { render_adventure } from '.'

const prettyjson = require('prettyjson')
function prettify_json(data: any, options = {}) {
	return prettyjson.render(data, options)
}

describe('📃  adventure rendering', function() {

	it('should render properly - simple case', () => {
		const adventure: Adventure = {
			hid: 'dying_man',
			good: true,
			gains: {
				level: 0,
				health: 0,
				mana: 0,
				strength: 0,
				agility: 0,
				charisma: 0,
				wisdom: 0,
				luck: 0,
				coin: 1234,
				token: 0,
				weapon: null,
				armor: null,
				weapon_improvement: false,
				armor_improvement: false,
			}
		}
		const $doc = render_adventure(adventure)
		//console.log(prettify_json($doc))

		const str = rich_text_to_ansi($doc)
		console.log(str)
		expect(str).to.be.a.string
		expect(str).to.include('A dying man on the street left you everything he had.')
		expect(str).to.include('You gained')
		expect(str).to.include('1234 coins')
	})

	describe('adventures', function() {
		beforeEach(() => xxx_internal_reset_prng_cache())

		ALL_GOOD_ADVENTURE_ARCHETYPES
			//.slice(0, 1)
			.forEach(({hid, good}, index) => {
			describe(`${good ? '✅' : '🚫'}  adventure #${index} "${hid}"`, function() {
				it('should be playable', () => {
					let state = factory()
					state = play(state, hid)

					const $doc = render_adventure(state.last_adventure!)
					//console.log(prettify_json($doc))
					const str = rich_text_to_ansi($doc)
					//console.log(str)
					// should just not throw
				})
			})
		})
	})
})
