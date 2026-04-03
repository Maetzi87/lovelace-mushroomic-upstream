import { IntlMessageFormat } from "intl-messageformat";
import { HomeAssistant } from "./ha";
import * as de from "./translations/de.json";
import * as en from "./translations/en.json";

const languages: Record<string, unknown> = {
  de,
  en,
};

const DEFAULT_LANG = "en";

function getTranslatedString(key: string, lang: string): string | undefined {
  try {
    return key
      .split(".")
      .reduce(
        (o, i) => (o as Record<string, unknown>)[i],
        languages[lang]
      ) as string;
  } catch (_) {
    return undefined;
  }
}

export default function setupCustomlocalize(hass?: HomeAssistant) {
  return function (key: string, argObject: Record<string, any> = {}) {
    const lang = hass?.locale.language ?? DEFAULT_LANG;

    let translated = getTranslatedString(key, lang);
    if (!translated) translated = getTranslatedString(key, DEFAULT_LANG);

    if (!translated) return key;
    try {
      const translatedMessage = new IntlMessageFormat(translated, lang);
      return translatedMessage.format<string>(argObject) as string;
    } catch (e) {
      console.error(
        `Error formatting message for key "${key}" with lang "${lang}":`,
        e
      );
      return translated;
    }
  };
}
