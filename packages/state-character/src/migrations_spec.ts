import { cloneDeep } from 'lodash'

import { SCHEMA_VERSION } from './consts'
import { migrate_to_latest } from './migrations'
import { CharacterClass, State } from './types'

const DATA_v0: any = {
	name: 'Perte',
	klass: CharacterClass.paladin,
	characteristics: {
		level: 13,

		health: 12,
		mana: 23,

		strength: 4,
		agility: 5,
		charisma: 6,
		wisdom: 7,
		luck: 8,
	},
	// no version = 0
}
Object.freeze(DATA_v0)
const DATA_OLDEST = DATA_v0

const DATA_v1: State = {
	name: 'Perte',
	klass: CharacterClass.paladin,
	attributes: {
		level: 13,

		health: 12,
		mana: 23,

		strength: 4,
		agility: 5,
		charisma: 6,
		wisdom: 7,
		luck: 8,
	},

	schema_version: 1,
}
Object.freeze(DATA_v1)
const DATA_LATEST = DATA_v1


describe('🤕 ❤️  Character state - schema migration', function() {

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

	describe('individual migration functions', function() {

		describe(`1 to latest`, function() {
			it('should work', () => {
				expect(migrate_to_latest(cloneDeep(DATA_v1))).to.deep.equal(DATA_LATEST)
			})
		})

		describe(`0 to latest`, function() {
			it('should work', () => {
				expect(migrate_to_latest(cloneDeep(DATA_v0))).to.deep.equal(DATA_LATEST)
			})
		})
	})
})
