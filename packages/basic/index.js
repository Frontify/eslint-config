module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    "linebreak-style": ["error", "unix"],
  },
  plugins: ["html", "prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error",
  },
};
