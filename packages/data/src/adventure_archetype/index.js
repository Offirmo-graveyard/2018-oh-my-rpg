const entries = [
	{ good: false, hid: 'bad_default', post: {}},

	{ good: true, hid: 'bored_log',             post: { gains: { strength: 1 }}},
	{ good: true, hid: 'caravan',               post: { gains: { coins: 'small' }}},
	{ good: true, hid: 'dying_man',             post: { gains: { coins: 'medium' }}},
	{ good: true, hid: 'ate_bacon',             post: { gains: { level: 1 }}},
	//{ good: true, hid: 'ate_mushroom',          post: { gains: { level: 1 }}},
	{ good: true, hid: 'ate_zombie',             post: { gains: { mana: 1 }}},
	{ good: true, hid: 'refreshing_nap',         post: { gains: { health: 1 }}},
	{ good: true, hid: 'older',                  post: { gains: { level: 1 }}},
	{ good: true, hid: 'stare_cup',              post: { gains: { mana: 2 }}},
	{ good: true, hid: 'nuclear_fusion_paper',   post: { gains: { wisdom: 1 }}},
	{ good: true, hid: 'found_green_mushroom',   post: { gains: { level: 1 }}},

	{ good: true, hid: 'found_red_mushroom',     post: { gains: { health: 1 }}},
	{ good: true, hid: 'found_blue_mushroom',    post: { gains: { mana: 1 }}},
	{ good: true, hid: 'found_white_mushroom',   post: { gains: { strength: 1 }}},
	{ good: true, hid: 'found_yellow_mushroom',  post: { gains: { agility: 1 }}},
	{ good: true, hid: 'found_orange_mushroom',  post: { gains: { charisma: 1 }}},
	{ good: true, hid: 'found_black_mushroom',   post: { gains: { wisdom: 1 }}},
	{ good: true, hid: 'found_rainbow_mushroom', post: { gains: { luck: 1 }}},
	{ good: true, hid: 'found_random_mushroom',  post: { gains: { luck: 1 }}, published: false},

	{ good: true, hid: 'meet_old_wizard',       post: { gains: { wisdom: 1 }}},
	{ good: true, hid: 'good_necromancer',      post: { gains: { agility: 1 }}},
	{ good: true, hid: 'talk_to_all_villagers', post: { gains: { charisma: 1 }}},
	{ good: true, hid: 'always_keep_potions',   post: { gains: { health: 1 }}},
	{ good: true, hid: 'lost',                  post: { gains: { health: 1 }}},
	{ good: true, hid: 'fate_sword',            post: { gains: { coins: 'small' }}},
	{ good: true, hid: 'grinding',              post: { gains: { level: 1 }}},
	{ good: true, hid: 'so_many_potions',       post: { gains: { strength: 1 }}},
	{ good: true, hid: 'rematch',               post: { gains: { level: 1 }}},
	{ good: true, hid: 'useless',               post: { gains: { wisdom: 1 }}},
	{ good: true, hid: 'escort',                post: { gains: { health: 1 }}},
	{ good: true, hid: 'rare_goods_seller',     post: { gains: { armor_or_weapon: true }}},
	{ good: true, hid: 'progress_loop',         post: { gains: { armor_or_weapon: true }}},
	{ good: true, hid: 'idiot_bandits',         post: { gains: { coins: 'medium' }}},
	{ good: true, hid: 'princess',              post: { gains: { coins: 'medium', armor_or_weapon_improvement: true }}},
	{ good: true, hid: 'bad_village',           post: { gains: { mana: 1 }}},
	{ good: true, hid: 'mana_mana',             post: { gains: { mana: 1 }}}
]


module.exports = entries
