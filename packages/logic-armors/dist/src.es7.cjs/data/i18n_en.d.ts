interface I18nMessages {
    [k: string]: string | I18nMessages;
}
declare const messages: I18nMessages;
export { I18nMessages, messages };
