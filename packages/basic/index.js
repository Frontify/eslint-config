module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    "prettier/prettier": "error",
    "prefer-template": "error",
    "no-useless-concat": "error",
    "prefer-arrow-callback": "error",
    "no-var": "error",
  },
  plugins: ["html", "prettier"],
  extends: ["plugin:prettier/recommended"],
};
