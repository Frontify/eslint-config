module.exports = {
  extends: [
    "@frontify/eslint-config-ts",
    "plugin:vue/recommended",
    "plugin:vue-scoped-css/recommended",
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "prefer-rest-params": 0,
  },
};
