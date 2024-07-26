import globals from "globals";


export default [
  {rules: {"no-alert": "warn"},
  files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
];