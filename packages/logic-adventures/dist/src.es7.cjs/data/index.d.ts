declare const i18n_messages: {
    en: {
        adventures: {
            bad_default: string;
            fight_won_coins: string;
            fight_won_loot: string;
            fight_won_any: string;
            fight_lost_any: string;
            fight_lost_shortcoming: string;
            bored_log: string;
            caravan: string;
            dying_man: string;
            ate_bacon: string;
            ate_zombie: string;
            refreshing_nap: string;
            older: string;
            stare_cup: string;
            nuclear_fusion_paper: string;
            found_green_mushroom: string;
            found_red_mushroom: string;
            found_blue_mushroom: string;
            found_white_mushroom: string;
            found_yellow_mushroom: string;
            found_orange_mushroom: string;
            found_black_mushroom: string;
            found_rainbow_mushroom: string;
            found_random_mushroom: string;
            meet_old_wizard: string;
            good_necromancer: string;
            talk_to_all_villagers: string;
            always_keep_potions: string;
            lost: string;
            fate_sword: string;
            grinding: string;
            so_many_potions: string;
            rematch: string;
            useless: string;
            escort: string;
            rare_goods_seller: string;
            progress_loop: string;
            idiot_bandits: string;
            princess: string;
            bad_village: string;
            mana_mana: string;
        };
    };
};
import { OutcomeArchetype, AdventureType } from '../types';
interface RawAdventureArchetypeEntry {
    good: boolean;
    hid: string;
    type: AdventureType;
    outcome: Partial<OutcomeArchetype>;
    isPublished?: boolean;
}
declare const ENTRIES: RawAdventureArchetypeEntry[];
export { RawAdventureArchetypeEntry, ENTRIES, i18n_messages };
