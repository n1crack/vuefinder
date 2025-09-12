const fs = require('fs');
const path = require('path');
const { parseArgs } = require('node:util');

/**
 * Generates a JavaScript and JSON file for a given locale.
 * @param {string} locale - The locale code (e.g., "en", "fr").
 * @param {string} uppyLocale - the uppy locale code
 */
function addLocale(locale, uppyLocale) {
    const jsFilePath = path.resolve(__dirname, `../src/locales/${locale}.js`);
    const jsonFilePath = path.resolve(__dirname, `../src/locales/json/${locale}.json`);
    const uppyLocalePath = path.resolve(__dirname, `../node_modules/@uppy/locales/lib/${uppyLocale}.js`)
    const uppyLocaleImportPath = `@uppy/locales/lib/${uppyLocale}.js`;

    if (!fs.existsSync(uppyLocalePath)) {
        throw `uppy locale ${uppyLocale} does not exist`
    }

    if (!fs.existsSync(jsonFilePath)) {
        fs.writeFileSync(jsonFilePath, "{}", 'utf8');
    }

    const content = `import locale from "./json/${locale}.json";
import uppyLocale from "${uppyLocaleImportPath}";

export default {
    ...locale,
    uppy: uppyLocale
};
`;

    fs.writeFileSync(jsFilePath, content, 'utf8');
}

const {positionals} = parseArgs({allowPositionals: true})
const [locale, uppyLocale] = positionals

addLocale(locale ?? 'en', uppyLocale ?? 'en_US');