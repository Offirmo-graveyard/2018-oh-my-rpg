import { I18nMessages } from './i18n_en';
declare const i18n_messages: I18nMessages;
interface RawArmorEntry {
    type: 'base' | 'qualifier1' | 'qualifier2';
    hid: string;
}
declare const ENTRIES: RawArmorEntry[];
export { RawArmorEntry, ENTRIES, I18nMessages, i18n_messages };
