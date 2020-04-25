module.exports = {
  extends: [
    // Use the Standard config as the base
    // https://github.com/stylelint/stylelint-config-standard
    'stylelint-config-standard',
    // Override rules that would interfere with Prettier
    // https://github.com/shannonmoeller/stylelint-config-prettier
    'stylelint-config-prettier'
  ],
  plugins: [
    // Bring in some extra rules for SCSS
    'stylelint-scss'
  ],
  rules: {
    // we want to have empty script tags in project at least in development for adding styles
    'no-empty-source': null,
    // ===
    // PRETTIER
    // ===
    // HACK: to compensate for https://github.com/shannonmoeller/stylelint-config-prettier/issues/4
    // Modifying setting from Standard: https://github.com/stylelint/stylelint-config-standard/blob/7b76d7d0060f2e13a331806a09c2096c7536b0a6/index.js#L6
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else']
      }
    ],
    // Allow SCSS and CSS module keywords beginning with `@`
    'at-rule-no-unknown': [null],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'responsive', 'media', 'screen']
      }
    ]
  }
}
