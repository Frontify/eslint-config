module.exports = {
  extends: [
    "@frontify/eslint-config-typescript",
    "plugin:react/recommended",
    "prettier/react",
  ],
  rules: {
    "jsx-quotes": ["error", "prefer-double"],
  },
};
