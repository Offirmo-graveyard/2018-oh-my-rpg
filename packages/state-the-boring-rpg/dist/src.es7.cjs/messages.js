"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RichText = require("@oh-my-rpg/rich-text-format");
function get_recap(state) {
    const isNewGame = (state.meaningful_interaction_count === 0);
    if (isNewGame) {
        return RichText.paragraph()
            .pushStrong('You are an otherworlder.{{br}}')
            .pushText('Congratulations, adventurer from another world!{{br}}')
            .pushText('You were chosen to enter the unknown realm of ')
            .pushStrong('Jaema')
            .pushText('.{{br}}')
            .pushText('Maybe were you just more courageous, cunning and curious than your peers?{{br}}')
            .pushText('But for now, let’s go on an adventure, for glory ⚔ and loot 📦 💰 !')
            .done();
    }
    return RichText.paragraph()
        .pushText('You are ')
        .pushNode(RichText.span().addClass('avatar__name').pushText(state.avatar.name).done(), 'name')
        .pushText(', the ')
        .pushNode(RichText.span().addClass('avatar__class').pushText(state.avatar.klass).done(), 'class')
        .pushText(' from another world.{{br}}')
        .pushText('You are adventuring in the mysterious world of ')
        .pushStrong('Jaema')
        .pushText('…{{br}}')
        .pushStrong('For glory ⚔  and loot 📦 💰 !')
        .done();
}
exports.get_recap = get_recap;
function get_tip(state) {
    const hasEverPlayed = !!state.click_count;
    if (!hasEverPlayed)
        return RichText.paragraph()
            .pushStrong('Tip: ')
            .pushText('Select ')
            .pushStrong('play')
            .pushText(' to start adventuring!')
            .done();
    // TODO suggest changing name
    // TODO suggest changing class
    return null;
}
exports.get_tip = get_tip;
/*
    const {
        level,
        health,
        mana,
        strength,
        agility,
        charisma,
        wisdom,
        luck,
    } = state.avatar.attributes
    return `The great saga of ${stylize_string.bold(state.avatar.name)}, ${state.avatar.klass} LVL${level}
HEALTH:${health} MANA:${mana} STR:${strength} AGI:${agility} CHA:${charisma} WIS:${wisdom} LUCK:${luck}`
}

 */
//# sourceMappingURL=messages.js.map