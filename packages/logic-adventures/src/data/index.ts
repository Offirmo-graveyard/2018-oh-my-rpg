import { CoinsGain, Outcome, AdventureType } from '../types'

/*import { messages as en } from './i18n_en'

const i18n_messages = {
	en,
}
*/

interface RawAdventureArchetypeEntry {
	good: boolean
	hid: string
	type?: AdventureType
	outcome: Partial<Outcome>
	isPublished?: boolean
}


const ENTRIES: RawAdventureArchetypeEntry[] = [
	{ good: false, hid: 'bad_default',           outcome: {}},

	{ good: true, hid: 'bored_log',              outcome: { strength: true }},
	{ good: true, hid: 'caravan',                outcome: { coins: 'small' }},
	{ good: true, hid: 'dying_man',              outcome: { coins: 'medium' }},
	{ good: true, hid: 'ate_bacon',              outcome: { level: true }},
	{ good: true, hid: 'ate_zombie',             outcome: { mana: true }},
	{ good: true, hid: 'refreshing_nap',         outcome: { health: true }},
	{ good: true, hid: 'older',                  outcome: { level: true }},
	{ good: true, hid: 'stare_cup',              outcome: { mana: true }},
	{ good: true, hid: 'nuclear_fusion_paper',   outcome: { wisdom: true }},
	{ good: true, hid: 'found_green_mushroom',   outcome: { level: true }},

	{ good: true, hid: 'found_red_mushroom',     outcome: { health: true }},
	{ good: true, hid: 'found_blue_mushroom',    outcome: { mana: true }},
	{ good: true, hid: 'found_white_mushroom',   outcome: { strength: true }},
	{ good: true, hid: 'found_yellow_mushroom',  outcome: { agility: true }},
	{ good: true, hid: 'found_orange_mushroom',  outcome: { charisma: true }},
	{ good: true, hid: 'found_black_mushroom',   outcome: { wisdom: true }},
	{ good: true, hid: 'found_rainbow_mushroom', outcome: { luck: true }},
	{ good: true, hid: 'found_random_mushroom',  outcome: { luck: true }, isPublished: false},

	{ good: true, hid: 'meet_old_wizard',        outcome: { wisdom: true }},
	{ good: true, hid: 'good_necromancer',       outcome: { agility: true }},
	{ good: true, hid: 'talk_to_all_villagers',  outcome: { charisma: true }},
	{ good: true, hid: 'always_keep_potions',    outcome: { health: true }},
	{ good: true, hid: 'lost',                   outcome: { health: true }},
	{ good: true, hid: 'fate_sword',             outcome: { coins: 'small' }},
	{ good: true, hid: 'grinding',               outcome: { level: true }},
	{ good: true, hid: 'so_many_potions',        outcome: { strength: true }},
	{ good: true, hid: 'rematch',                outcome: { level: true }},
	{ good: true, hid: 'useless',                outcome: { wisdom: true }},
	{ good: true, hid: 'escort',                 outcome: { health: true }},
	{ good: true, hid: 'rare_goods_seller',      outcome: { armor_or_weapon: true }},
	{ good: true, hid: 'progress_loop',          outcome: { armor_or_weapon: true }},
	{ good: true, hid: 'idiot_bandits',          outcome: { coins: 'medium' }},
	{ good: true, hid: 'princess',               outcome: { coins: 'medium', armor_or_weapon_improvement: true }},
	{ good: true, hid: 'bad_village',            outcome: { mana: true }},
	{ good: true, hid: 'mana_mana',              outcome: { mana: true }},
]


export {
	RawAdventureArchetypeEntry,
	ENTRIES,
}
