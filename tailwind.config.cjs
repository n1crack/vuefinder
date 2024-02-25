const plugin = require("tailwindcss/plugin");
const fs = require("fs");
const postcss = require("postcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  important: '.vuefinder',
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    /* Preflight but limit to only apply our components */
    // https://github.com/tailwindlabs/tailwindcss/discussions/10332#discussioncomment-4699227
    plugin(({ addBase }) => {
      const preflightStyles = postcss.parse(
        fs.readFileSync(require.resolve('./src/assets/css/preflight.css'), "utf8")
      )

      // Scope the selectors to specific components
      preflightStyles.walkRules((rule) => {
        rule.selector = rule.selectors
          .map(selector => ".vuefinder " + selector)
          .join(",");
      });

      addBase(preflightStyles.nodes)
    })
  ],
  corePlugins: {
    preflight: false,
  }
}
