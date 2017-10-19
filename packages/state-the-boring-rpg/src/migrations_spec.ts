import { cloneDeep } from 'lodash'

import { SCHEMA_VERSION } from './consts'
import { migrate_to_latest } from './migrations'
import { State } from './types'

const DATA_v1_20171017: any = {
	meta: {
		uuid: '0ce9c180-e86e-4225-a913-3dc9519600aa',
		name: 'Offirmo',
		email: 'offirmo.net@gmail.com',
		allow_telemetry: true,
	},
	avatar: {
		name: 'Perte',
		klass: 'paladin',
		characteristics: {
			level: 7,
			health: 12,
			mana: 23,
			strength: 3,
			agility: 4,
			charisma: 5,
			wisdom: 6,
			luck: 7,
		},
	},
	inventory: {
		unslotted_capacity: 20,
		slotted: {
			weapon: {
				slot: 'weapon',
				base_hid: 'claw',
				qualifier1_hid: 'invincible',
				qualifier2_hid: 'executioner',
				quality: 'common',
				base_strength: 20,
				enhancement_level: 3,
			},
			armor: {
				slot: 'armor',
				base_hid: 'mantle',
				qualifier1_hid: 'golden',
				qualifier2_hid: 'warfield_king',
				quality: 'uncommon',
				base_strength: 14,
				enhancement_level: 1,
			},
		},
		unslotted: [
			{
				slot: 'armor',
				base_hid: 'shoulders',
				qualifier1_hid: 'robust',
				qualifier2_hid: 'pioneer',
				quality: 'common',
				base_strength: 15,
				enhancement_level: 0,
			},
			{
				slot: 'armor',
				base_hid: 'helmet',
				qualifier1_hid: 'sapphire',
				qualifier2_hid: 'warfield',
				quality: 'uncommon',
				base_strength: 2,
				enhancement_level: 0,
			},
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
		],
	},
	wallet: {
		coin_count: 1750,
		token_count: 34,
	},
	prng: {
		seed: 987,
		use_count: 456,
	},
	last_adventure: {
		hid: 'fight_lost_any',
		good: true,
		encounter: {
			name: 'chicken',
			level: 7,
			rank: 'elite',
			possible_emoji: '🐓',
		},
		gains: {
			level: 0,
			health: 0,
			mana: 0,
			strength: 0,
			agility: 0,
			charisma: 0,
			wisdom: 0,
			luck: 1,
			coins: 0,
			tokens: 0,
			armor: null,
			weapon: null,
			armor_improvement: false,
			weapon_improvement: false,
		},
	},
	click_count:                  86,
	good_click_count:             86,
	meaningful_interaction_count: 86,

	schema_version: 1,
}
Object.freeze(DATA_v1_20171017)
const DATA_OLDEST = DATA_v1_20171017

const DATA_v1_20171018: State = {
	meta: {
		uuid: '0ce9c180-e86e-4225-a913-3dc9519600aa',
		name: 'Offirmo',
		email: 'offirmo.net@gmail.com',
		allow_telemetry: true,
	},
	avatar: {
		name: 'Perte',
		klass: 'paladin',
		attributes: {
			level: 7,
			health: 12,
			mana: 23,
			strength: 3,
			agility: 4,
			charisma: 5,
			wisdom: 6,
			luck: 7,
		},
		schema_version: 1,
	},
	inventory: {
		unslotted_capacity: 20,
		slotted: {
			weapon: {
				slot: 'weapon',
				base_hid: 'claw',
				qualifier1_hid: 'invincible',
				qualifier2_hid: 'executioner',
				quality: 'common',
				base_strength: 20,
				enhancement_level: 3,
			},
			armor: {
				slot: 'armor',
				base_hid: 'mantle',
				qualifier1_hid: 'golden',
				qualifier2_hid: 'warfield_king',
				quality: 'uncommon',
				base_strength: 14,
				enhancement_level: 1,
			},
		},
		unslotted: [
			{
				slot: 'armor',
				base_hid: 'shoulders',
				qualifier1_hid: 'robust',
				qualifier2_hid: 'pioneer',
				quality: 'common',
				base_strength: 15,
				enhancement_level: 0,
			},
			{
				slot: 'armor',
				base_hid: 'helmet',
				qualifier1_hid: 'sapphire',
				qualifier2_hid: 'warfield',
				quality: 'uncommon',
				base_strength: 2,
				enhancement_level: 0,
			},
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
		],
	},
	wallet: {
		coin_count: 1750,
		token_count: 34,
	},
	prng: {
		seed: 987,
		use_count: 456,
	},
	last_adventure: {
		hid: 'fight_lost_any',
		good: true,
		encounter: {
			name: 'chicken',
			level: 7,
			rank: 'elite',
			possible_emoji: '🐓',
		},
		gains: {
			level: 0,
			health: 0,
			mana: 0,
			strength: 0,
			agility: 0,
			charisma: 0,
			wisdom: 0,
			luck: 1,
			coins: 0,
			tokens: 0,
			armor: null,
			weapon: null,
			armor_improvement: false,
			weapon_improvement: false,
		},
	},
	click_count:                  86,
	good_click_count:             86,
	meaningful_interaction_count: 86,

	schema_version: 1,
} as any as State
Object.freeze(DATA_v1_20171018)
const DATA_LATEST = DATA_v1_20171018


describe('⚔ 👑 😪  The Boring RPG - schema migration', function() {

	context('when the version is more recent', function() {

		it('should throw with a meaningful error', () => {
			function load() {
				migrate_to_latest({ schema_version: 99999 })
			}
			expect(load).to.throw('more recent version')
		})
	})

	context('when the version is up to date', function() {

		it('should return the state without change', () => {
			expect(DATA_LATEST.schema_version).to.equal(SCHEMA_VERSION) // make sure our tests are up to date
			expect(migrate_to_latest(cloneDeep(DATA_LATEST))).to.deep.equal(DATA_LATEST)
		})
	})

	context('when the version is outdated', function() {

		it('should migrate to latest version', () => {
			expect(migrate_to_latest(cloneDeep(DATA_OLDEST))).to.deep.equal(DATA_LATEST)
		})
	})
})
