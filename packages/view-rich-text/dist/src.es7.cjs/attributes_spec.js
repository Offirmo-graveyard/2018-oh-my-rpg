"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_character_1 = require("@oh-my-rpg/state-character");
const { rich_text_to_ansi } = require('../../../the-npm-rpg/src/v2/utils/rich_text_to_ansi');
const _1 = require(".");
describe.only('🔠  view to @oh-my-rpg/rich-text-format', function () {
    describe('🏋  full character sheet rendering', function () {
        describe('demo', function () {
            it.only('shows off', () => {
                const $doc = _1.render_character_sheet(state_character_1.DEMO_STATE);
                console.log(rich_text_to_ansi($doc));
            });
        });
    });
});
//# sourceMappingURL=attributes_spec.js.map