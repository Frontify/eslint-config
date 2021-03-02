module.exports = {
  extends: [
    "@frontify/eslint-config-typescript",
    "plugin:react/recommended",
    "prettier",
  ],
  rules: {
    "jsx-quotes": ["error", "prefer-double"],
  },
};
