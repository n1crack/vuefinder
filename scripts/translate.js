import { addLocale, __dirname } from "./addLocale.js";
import { execSync } from 'child_process';
import path from 'path';

const locales = [
    // {'locale': 'en', 'uppyLocale': 'en_US', 'lang': 'English'},
    {'locale': 'de', 'uppyLocale': 'de_DE', 'lang': 'German'},
    {'locale': 'af', 'uppyLocale': null, 'lang': 'Afrikaans'},
    {'locale': 'bg', 'uppyLocale': 'bg_BG', 'lang': 'Bulgarian'},
    {'locale': 'cs', 'uppyLocale': 'cs_CZ', 'lang': 'Czech'},
    {'locale': 'el', 'uppyLocale': 'el_GR', 'lang': 'Greek'},
    {'locale': 'es', 'uppyLocale': 'es_ES', 'lang': 'Spanish'},
    {'locale': 'fa', 'uppyLocale': 'fa_IR', 'lang': 'Persian'},
    {'locale': 'fr', 'uppyLocale': 'fr_FR', 'lang': 'French'},
    {'locale': 'he', 'uppyLocale': 'he_IL', 'lang': 'Hebrew'},
    // {'locale': 'hy', 'uppyLocale': null, 'lang': 'Armenian'},
    {'locale': 'it', 'uppyLocale': 'it_IT', 'lang': 'Italian'},
    // {'locale': 'ka', 'uppyLocale': null, 'lang': 'Georgian'},
    // {'locale': 'lb', 'uppyLocale': null, 'lang': 'Luxembourgish'},
    // {'locale': 'mk', 'uppyLocale': null, 'lang': 'Macedonian'},
    {'locale': 'nl', 'uppyLocale': 'nl_NL', 'lang': 'Dutch'},
    {'locale': 'pt', 'uppyLocale': 'pt_PT', 'lang': 'Portuguese'},
    {'locale': 'ru', 'uppyLocale': 'ru_RU', 'lang': 'Russian'},
    {'locale': 'th', 'uppyLocale': 'th_TH', 'lang': 'Thai'},
    {'locale': 'vi', 'uppyLocale': 'vi_VN', 'lang': 'Vietnamese'},
    {'locale': 'ar', 'uppyLocale': 'ar_SA', 'lang': 'Arabic'},
    {'locale': 'bs', 'uppyLocale': null, 'lang': 'Bosnian'},
    {'locale': 'da', 'uppyLocale': 'da_DK', 'lang': 'Danish'},
    // {'locale': 'et', 'uppyLocale': null, 'lang': 'Estonian'},
    {'locale': 'fi', 'uppyLocale': 'fi_FI', 'lang': 'Finnish'},
    {'locale': 'gl', 'uppyLocale': 'gl_ES', 'lang': 'Galician'},
    {'locale': 'hr', 'uppyLocale': 'hr_HR', 'lang': 'Croatian'},
    {'locale': 'id', 'uppyLocale': 'id_ID', 'lang': 'Indonesian'},
    {'locale': 'ja', 'uppyLocale': 'ja_JP', 'lang': 'Japanese'},
    // {'locale': 'km', 'uppyLocale': null, 'lang': 'Khmer'},
    // {'locale': 'lt', 'uppyLocale': null, 'lang': 'Lithuanian'},
    // {'locale': 'mn', 'uppyLocale': null, 'lang': 'Mongolian'},
    {'locale': 'pl', 'uppyLocale': 'pl_PL', 'lang': 'Polish'},
    {'locale': 'sk', 'uppyLocale': 'sk_SK', 'lang': 'Slovak'},
    {'locale': 'sr', 'uppyLocale': 'sr_RS_Latin', 'lang': 'Serbian'},
    {'locale': 'tr', 'uppyLocale': 'tr_TR', 'lang': 'Turkish'},
    {'locale': 'zh_CN', 'uppyLocale': 'zh_CN', 'lang': 'Chinese'},
    {'locale': 'az', 'uppyLocale': null, 'lang': 'Azerbaijani'},
    {'locale': 'ca', 'uppyLocale': 'ca_ES', 'lang': 'Catalan'},
    // {'locale': 'eu', 'uppyLocale': null, 'lang': 'Basque'},
    // {'locale': 'gu', 'uppyLocale': null, 'lang': 'Gujarati'},
    {'locale': 'hu', 'uppyLocale': 'hu_HU', 'lang': 'Hungarian'},
    {'locale': 'is', 'uppyLocale': 'is_IS', 'lang': 'Icelandic'},
    // {'locale': 'kab', 'uppyLocale': null, 'lang': 'Kabyle'},
    {'locale': 'ko', 'uppyLocale': 'ko_KR', 'lang': 'Korean'},
    // {'locale': 'lv', 'uppyLocale': null, 'lang': 'Latvian'},
    {'locale': 'nb', 'uppyLocale': 'nb_NO', 'lang': '"Norwegian Bokmål"'},
    {'locale': 'ro', 'uppyLocale': 'ro_RO', 'lang': 'Romanian'},
    {'locale': 'sl', 'uppyLocale': null, 'lang': 'Slovenian'},
    {'locale': 'sv', 'uppyLocale': 'sv_SE', 'lang': 'Swedish'},
    {'locale': 'uk', 'uppyLocale': 'uk_UA', 'lang': 'Ukrainian'},
    {'locale': 'hi', 'uppyLocale': 'hi_IN', 'lang': 'Hindi'},
];

locales.forEach(({ locale, uppyLocale, lang }) => {
    try {
        addLocale(locale, uppyLocale ?? 'en_US');
        console.log(`Locale added: ${locale}`);

        const srcFile = path.resolve(__dirname, `../src/locales/json/en.json`);
        const targetFile = path.resolve(__dirname, `../src/locales/json/${locale}.json`);

        execSync(
            `npx attranslate --srcFile ${srcFile} --srcLng English --srcFormat nested-json --targetFile ${targetFile} --targetLng ${lang} --targetFormat nested-json --service typechat-manual`,
            { stdio: 'inherit' }
        );

        console.log(`Translations created for locale: ${locale}`);
    } catch (error) {
        console.error(`Failed to process locale ${locale}:`, error);
    }
});



