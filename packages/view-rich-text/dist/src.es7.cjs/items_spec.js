"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RichText = require("@oh-my-rpg/rich-text-format");
const definitions_1 = require("@oh-my-rpg/definitions");
const logic_weapons_1 = require("@oh-my-rpg/logic-weapons");
const logic_armors_1 = require("@oh-my-rpg/logic-armors");
const { rich_text_to_ansi } = require('../../../the-npm-rpg/src/utils/rich_text_to_ansi');
const prettyjson = require('prettyjson');
function prettify_json(data, options = {}) {
    return prettyjson.render(data, options);
}
const _1 = require(".");
describe('⚔ 🛡 item rendering', function () {
    describe('⚔  weapon rendering', function () {
        context('when not enhanced', function () {
            it('should render properly', () => {
                const $doc = _1.render_weapon({
                    slot: definitions_1.InventorySlot.weapon,
                    base_hid: 'luth',
                    qualifier1_hid: 'simple',
                    qualifier2_hid: 'mercenary',
                    quality: definitions_1.ItemQuality.legendary,
                    base_strength: 14,
                    enhancement_level: 0,
                });
                const str = RichText.to_text($doc);
                expect(str).to.be.a.string;
                expect(str).to.include('Luth');
                expect(str).to.include('Simple');
                expect(str).to.include('Mercenary');
                expect(str).not.to.include('+');
            });
        });
        context('when enhanced', function () {
            it('should render properly', () => {
                const $doc = _1.render_weapon({
                    slot: definitions_1.InventorySlot.weapon,
                    base_hid: 'longsword',
                    qualifier1_hid: 'onyx',
                    qualifier2_hid: 'warfield_king',
                    quality: definitions_1.ItemQuality.legendary,
                    base_strength: 14,
                    enhancement_level: 3,
                });
                const str = RichText.to_text($doc);
                expect(str).to.be.a.string;
                expect(str).to.include('Long sword');
                expect(str).to.include('Onyx');
                expect(str).to.include('Warfield king’s');
                expect(str).to.include('+3');
            });
        });
    });
    describe('🛡  armor rendering', function () {
        context('when not enhanced', function () {
            it('should render properly', () => {
                const $doc = _1.render_armor({
                    slot: definitions_1.InventorySlot.armor,
                    base_hid: 'socks',
                    qualifier1_hid: 'onyx',
                    qualifier2_hid: 'tormentor',
                    quality: definitions_1.ItemQuality.legendary,
                    base_strength: 14,
                    enhancement_level: 0
                });
                const str = RichText.to_text($doc);
                expect(str).to.be.a.string;
                expect(str).to.include('Socks');
                expect(str).to.include('Onyx');
                expect(str).to.include('Tormentor');
                expect(str).not.to.include('+');
            });
        });
        context('when enhanced', function () {
            it('should render properly', () => {
                const $doc = _1.render_armor({
                    slot: definitions_1.InventorySlot.armor,
                    base_hid: 'mantle',
                    qualifier1_hid: 'embroidered',
                    qualifier2_hid: 'warfield_king',
                    quality: definitions_1.ItemQuality.legendary,
                    base_strength: 14,
                    enhancement_level: 5
                });
                const str = RichText.to_text($doc);
                expect(str).to.be.a.string;
                expect(str).to.include('Mantle');
                expect(str).to.include('Embroidered');
                expect(str).to.include('Warfield');
                expect(str).to.include('+5');
            });
        });
    });
    describe('demos', function () {
        it('shows off weapons', () => {
            const doc2 = _1.render_weapon(logic_weapons_1.DEMO_WEAPON_2);
            //console.log(prettify_json(doc2))
            console.log(rich_text_to_ansi(doc2));
            const doc1 = _1.render_weapon(logic_weapons_1.DEMO_WEAPON_1);
            //console.log(prettify_json(doc1))
            console.log(rich_text_to_ansi(doc1));
            for (let i = 0; i < 10; ++i) {
                const item = logic_weapons_1.generate_random_demo_weapon();
                const doc = _1.render_weapon(item);
                //console.log(prettify_json(doc))
                console.log(rich_text_to_ansi(doc));
            }
        });
        it('shows off armors', () => {
            const doc2 = _1.render_armor(logic_armors_1.DEMO_ARMOR_2);
            //console.log(prettify_json(doc2))
            console.log(rich_text_to_ansi(doc2));
            const doc1 = _1.render_armor(logic_armors_1.DEMO_ARMOR_1);
            //console.log(prettify_json(doc1))
            console.log(rich_text_to_ansi(doc1));
            for (let i = 0; i < 10; ++i) {
                const item = logic_armors_1.generate_random_demo_armor();
                const doc = _1.render_armor(item);
                //console.log(prettify_json(doc))
                console.log(rich_text_to_ansi(doc));
            }
        });
    });
});
//# sourceMappingURL=items_spec.js.map