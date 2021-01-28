module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ["standard"],
  plugins: ["html"],
  settings: {
    "import/resolver": {
      node: { extensions: [".js", ".mjs"] },
    },
  },
  rules: {
  },
};
