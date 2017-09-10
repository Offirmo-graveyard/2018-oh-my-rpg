module.exports = {
	clickmsg: {
		bad_default: `You clicked too early!
+{penalty_s}s !`,

		// from the original game
		bored_log: `
You were so bored, you punched a log for hours!
You gained +{strength} strength!`,
		caravan: `
You were hired to protect a caravan of merchants.
You gained {formattedCoins} coins!`,
		dying_man: `
A dying man on the street left you everything he had.
You gained {formattedCoins} coins!`,
		ate_bacon: `
You ate some bacon.
You gained +{level} level!`,
		/* too bland, please!
		ate_mushroom: `
You ate a mushroom.
You gained +{level} level!`,*/
		ate_zombie: `
You ate a zombie.
You gained +{mana} mana!`,
		refreshing_nap: `
You took a nap and feel refreshed.
You gained +{health} health!`,
		older: `
You feel a little older.
You gained +{level} level!`,
		stare_cup: `
You stare really hard at a cup, and it almost moves!
You gained +{mana} mana!`,
		nuclear_fusion_paper: `
You wrote a paper on nuclear fusion.
You gained +{wisdom} wisdom!`,
		found_green_mushroom: `
You found a green mushroom.
You gained +{level} level!`,

		// from me, inferred
		found_red_mushroom: `
You found a red mushroom.
You gained +{health} health!`,
		found_blue_mushroom: `
You found a blue mushroom.
You gained +{mana} mana!`,
		found_white_mushroom: `
You found a white mushroom.
You gained +{strength} strength!`,
		found_yellow_mushroom: `
You found a yellow mushroom.
You gained +{agility} agility!`,
		found_orange_mushroom: `
You found an orange mushroom.
You gained +{charisma} charisma!`,
		found_black_mushroom: `
You found a black mushroom.
You gained +{wisdom} wisdom!`,
		found_rainbow_mushroom: `
You found a glowing rainbow mushroom.
You gained +{luck} luck!`,
		found_random_mushroom: `
You found a golden mushroom.
You gained +{charac} {charac_name}!`,

		// from me
		meet_old_wizard: `
You meet a mysterious old wizard…
Before giving you the quest, he tells you his loooong story : Vous gain +{wisdom} wisdom!`,
		// electricbunnycomics.com
		good_necromancer: `
You meet a child weeping over his dead hamster pet… Thanks to necromancy, you reanimate it an a hamster-zombie!
Oddly, the child cries even more while running away.
Fortunately, you gain +{agility} agility for avoiding the stones thrown by the villagers.`,
		// dorkly
		talk_to_all_villagers: `
You spoke to all villagers in the village : no quest may have escaped you!
On the other hand, your head aches for discussing so much.
+{charisma} charisma thanks to this training!`,
		always_keep_potions: `
Being a good adventurer, you kept a health potion "just in case":
Well done, your health is top-notch!`,
		lost: `
With all those quests, you forgot where you had to go…
But circling around the whole map is good for your health: +{health} health!`,
		// DK
		fate_sword: `
To thank you for saving his wife and his children, the farmer offer you "Destiny",
the heirloom sword passed in his family from generations.
30 minutes later, the merchant only gives you {formattedCoins} coins for it… Ahh those poors!`,
		// dorkly
		grinding: `
For lack of a better idea, you grind for hours and hours…
So what? It's an RPG, what did you expect?
But it pays: +{level} level!`,
		// ?
		so_many_potions: `
The fight against the final boss was hard, very hard…
Most importantly, +{strength} strength for managing to control a pressing urge after drinking 25 potions !`,
		// cad-comic.com
		rematch: `
You got beaten by a goblin!
Shameful, you roam around the country, accepting quests after quests to train yourself before facing him again.
Unfortunately, he also trained and beat you again!
Well, the +{level} level will always be useful…`,
		// paintraincomic.com
		// http://paintraincomic.com/comic/cemetery/
		useless: `
Arriving at the village, the mayor testify that the neighborhood is no longer dangerous.
The sorceress find herself someone and no longer curses people.
The haunted cemetery was a pet cemetery, villagers are happy to have them back.
The giant is helping the farmers in the fields.
You feel useless and reflect on your role in the world. +{wisdom} wisdom!`,
		// memecenter.com
		escort: `
You are escorting an important NPC.
Unfortunately, if you walk, he's faster thant you.
However, if you run, you're faster than him!
By slaloming and running into circles, you manage.
+{health} health thanks to those efforts!`,
		// memecenter.com
		rare_goods_seller: `
You come across an old man with excentric apparel.
Score! It's a rare item seller!
He gives you a good price for a {formattedItem}.`,
		// memecenter.com
		progress_loop: `
You would need better gear to level up.
But you'd need to level up to get better gear.
Cruel dilemma !
Fortunately, you find a {formattedItem} at the bottom of a well!`,
		// memecenter.com/motohorse
		idiot_bandits: `
You are being talked about since you slayed the dragon and defeated the sorceress.
Bandits embush you, aiming for your wealth. What a silly idea!
You read in the eyes of last one that he realizes it on moment
before your fireball incinerate him.
Fortunately, gold doesn't burn: +{formattedCoins} coins!`,
		// don't remember the source for this one
		princess: `
« You won't take back the princess! » yell the terrible black mage,
as you reach his throne room.
You reassure him: you are only here for loot.
He let you help yourself (+{formattedCoins} coins)
and enchant your weapon!`,
		// DM of the ring
		bad_village: `
You reach a new village. There is no weapon shop.
No potion shop either! And no quests at the inn!!
That's too much. At your call, lightnings and meteors wipe this useless place.
Good opportunity to practice your magic: +{mana} mana.`,
		// ?
		mana_mana: `
« Mah na mah na » « To to to do do »
+{mana} mana!`,

		/*
		 // "make friends" necromancy
		 xmake_friends:
		 '',
		 // licorne multicolore
		 xunicorns:
		 '',
		 // memes
		 xarrown_in_the_knee:
		 '', // arrow in the knee
		 // retour chez le mage noir, apprentissage de sorts
		 xblack_mage_again:
		 '',
		 */
	}
}
