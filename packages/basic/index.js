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
    "prefer-const": "error",
    eqeqeq: "error",
    "no-eval": "error",
    "no-extra-bind": "error",
    curly: "error",
    "import/no-default-export": "error",
  },
  plugins: ["html", "prettier", "import"],
  extends: ["plugin:prettier/recommended"],
};
