"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Globalize = require("globalize");
const CLDRData = require("cldr-data");
const stylizeString = require("chalk");
const definitions_1 = require("@oh-my-rpg/definitions");
const logic_weapons_1 = require("@oh-my-rpg/logic-weapons");
const logic_armors_1 = require("@oh-my-rpg/logic-armors");
const logic_monsters_1 = require("@oh-my-rpg/logic-monsters");
const i18n_1 = require("@oh-my-rpg/data/src/adventure_archetype/i18n");
const i18n_2 = require("@oh-my-rpg/data/src/weapon_component/i18n");
const state_inventory_1 = require("@oh-my-rpg/state-inventory");
const state_wallet_1 = require("@oh-my-rpg/state-wallet");
const _1 = require(".");
function stylize_tbrpg_string(style, s) {
    switch (style) {
        case 'item_quality_common':
            return stylizeString.gray(s);
        case 'item_quality_uncommon':
            return stylizeString.green(s);
        case 'item_quality_rare':
            return stylizeString.blue(s);
        case 'item_quality_epic':
            return stylizeString.magenta(s);
        case 'item_quality_legendary':
            return stylizeString.red(s);
        case 'item_quality_artifact':
            return stylizeString.yellow(s);
        case 'change_outline':
            return stylizeString.italic.bold.red(s);
        default:
            return `[XXX unkwown style ${style}]` + stylizeString.bold.red(s);
    }
}
describe('🔠  view to text', function () {
    const rendering_options = {};
    before(function init_globalize() {
        Globalize.load(CLDRData.entireSupplemental());
        Globalize.load(CLDRData.entireMainFor('en'));
        //Globalize.loadTimeZone(require('iana-tz-data'))
        const messages = {
            en: Object.assign({}, i18n_1.en, i18n_2.en, logic_armors_1.i18n_messages.en)
        };
        //console.log(messages)
        Globalize.loadMessages(messages);
        rendering_options.globalize = Globalize('en');
        rendering_options.stylize = stylize_tbrpg_string;
    });
    describe('📃  adventure rendering', function () {
        it('should render properly', () => {
            const str = _1.render_adventure({
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
                    coins: 1234,
                    tokens: 0,
                    weapon: null,
                    armor: null,
                    weapon_improvement: false,
                    armor_improvement: false,
                }
            }, {
                globalize: Globalize('en'),
                stylize: (style, s) => s
            });
            expect(str).to.be.a.string;
            expect(str).to.include('A dying man on the street left you everything he had.');
            expect(str).to.include('You gained 1,234 coins!');
        });
    });
    describe('⚔  weapon rendering', function () {
        context('when not enhanced', function () {
            it('should render properly', () => {
                const str = _1.render_weapon({
                    slot: definitions_1.InventorySlot.weapon,
                    base_hid: 'luth',
                    qualifier1_hid: 'simple',
                    qualifier2_hid: 'mercenary',
                    quality: definitions_1.ItemQuality.legendary,
                    base_strength: 14,
                    enhancement_level: 0,
                }, {
                    globalize: Globalize('en'),
                    stylize: (style, s) => s
                });
                expect(str).to.be.a.string;
                expect(str).to.include('Luth');
                expect(str).to.include('Simple');
                expect(str).to.include('Mercenary');
                expect(str).not.to.include('+');
            });
        });
        context('when enhanced', function () {
            it('should render properly', () => {
                const str = _1.render_weapon({
                    slot: definitions_1.InventorySlot.weapon,
                    base_hid: 'longsword',
                    qualifier1_hid: 'onyx',
                    qualifier2_hid: 'warfield_king',
                    quality: definitions_1.ItemQuality.legendary,
                    base_strength: 14,
                    enhancement_level: 3,
                }, {
                    globalize: Globalize('en'),
                    stylize: (style, s) => s
                });
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
                const str = _1.render_armor({
                    slot: definitions_1.InventorySlot.armor,
                    base_hid: 'socks',
                    qualifier1_hid: 'onyx',
                    qualifier2_hid: 'tormentor',
                    quality: definitions_1.ItemQuality.legendary,
                    base_strength: 14,
                    enhancement_level: 0
                }, {
                    globalize: Globalize('en'),
                    stylize: (style, s) => s
                });
                expect(str).to.be.a.string;
                expect(str).to.include('socks');
                expect(str).to.include('onyx');
                expect(str).to.include('tormentor');
                expect(str).not.to.include('+');
            });
        });
        context('when enhanced', function () {
            it('should render properly', () => {
                const str = _1.render_armor({
                    slot: definitions_1.InventorySlot.armor,
                    base_hid: 'mantle',
                    qualifier1_hid: 'embroidered',
                    qualifier2_hid: 'warfield_king',
                    quality: definitions_1.ItemQuality.legendary,
                    base_strength: 14,
                    enhancement_level: 5
                }, {
                    globalize: Globalize('en'),
                    stylize: (style, s) => s
                });
                expect(str).to.be.a.string;
                expect(str).to.include('mantle');
                expect(str).to.include('embroidered');
                expect(str).to.include('warfield_king');
                expect(str).to.include('+5');
            });
        });
    });
    describe('⚔ 🛡  equipment rendering', function () {
        context('when empty', function () {
            it('should render properly', () => {
                let inventory = state_inventory_1.factory();
                const str = _1.render_equipment(inventory, {
                    globalize: Globalize('en'),
                    stylize: (style, s) => s
                });
                expect(str).to.be.a.string;
            });
        });
        context('when not empty', function () {
            it('should render properly', () => {
                let inventory = state_inventory_1.factory();
                inventory = state_inventory_1.add_item(inventory, logic_weapons_1.generate_random_demo_weapon());
                inventory = state_inventory_1.add_item(inventory, logic_armors_1.generate_random_demo_armor());
                inventory = state_inventory_1.equip_item(inventory, 0);
                inventory = state_inventory_1.equip_item(inventory, 1);
                const str = _1.render_equipment(inventory, {
                    globalize: Globalize('en'),
                    stylize: (style, s) => s
                });
                expect(str).to.be.a.string;
            });
        });
    });
    describe('📦  inventory rendering', function () {
        context('when empty', function () {
            it('should render properly', () => {
                let inventory = state_inventory_1.factory();
                const str = _1.render_inventory(inventory, {
                    globalize: Globalize('en'),
                    stylize: (style, s) => s
                });
                expect(str).to.be.a.string;
                expect(str).to.contain('a.');
                expect(str).to.contain('t.');
                expect(str).not.to.contain('u.');
                expect(str).not.to.contain(' 1.');
                expect(str).not.to.contain(' 0.');
                expect(str).not.to.contain('20.');
            });
        });
        context('when not empty', function () {
            it('should render properly', () => {
                let inventory = state_inventory_1.factory();
                inventory = state_inventory_1.add_item(inventory, logic_weapons_1.generate_random_demo_weapon());
                inventory = state_inventory_1.add_item(inventory, logic_weapons_1.generate_random_demo_weapon());
                inventory = state_inventory_1.add_item(inventory, logic_armors_1.generate_random_demo_armor());
                inventory = state_inventory_1.add_item(inventory, logic_weapons_1.generate_random_demo_weapon());
                inventory = state_inventory_1.add_item(inventory, logic_armors_1.generate_random_demo_armor());
                inventory = state_inventory_1.add_item(inventory, logic_armors_1.generate_random_demo_armor());
                inventory = state_inventory_1.remove_item(inventory, 4);
                const str = _1.render_inventory(inventory, {
                    globalize: Globalize('en'),
                    stylize: (style, s) => s
                });
                expect(str).to.be.a.string;
                expect(str).to.contain('a.');
                expect(str).to.contain('t.');
            });
        });
    });
    describe('💰  wallet rendering', function () {
        context('when empty', function () {
            it('should render properly', () => {
                let wallet = state_wallet_1.factory();
                const str = _1.render_wallet(wallet);
                expect(str).to.be.a.string;
                expect(str).to.contain('0');
            });
        });
        context('when not empty', function () {
            it('should render properly', () => {
                let wallet = state_wallet_1.factory();
                wallet = state_wallet_1.add_amount(wallet, state_wallet_1.Currency.coin, 12);
                wallet = state_wallet_1.add_amount(wallet, state_wallet_1.Currency.token, 34);
                const str = _1.render_wallet(wallet);
                expect(str).to.be.a.string;
                expect(str).not.to.contain('0');
                expect(str).to.contain('12');
                expect(str).to.contain('34');
            });
        });
    });
    describe('demo', function () {
        it('shows off monsters', () => {
            for (let i = 0; i < 10; ++i)
                console.log(_1.render_monster(logic_monsters_1.generate_random_demo_monster(), rendering_options));
        });
        it('shows off weapons', () => {
            for (let i = 0; i < 10; ++i) {
                const i = logic_weapons_1.generate_random_demo_weapon();
                console.log(`⚔  ${i.quality} ` + _1.render_item(i, rendering_options));
            }
        });
        it.only('shows off armors', () => {
            for (let i = 0; i < 100; ++i) {
                const i = logic_armors_1.generate_random_demo_armor();
                console.log(`🛡  ${i.quality} ` + _1.render_item(i, rendering_options));
            }
        });
    });
});
//# sourceMappingURL=index_spec.js.map