module.exports = {
  extends: [
    "@frontify/eslint-config-typescript",
    "plugin:react/recommended",
    "prettier",
  ],
  rules: {
    "jsx-quotes": ["error", "prefer-double"],
    "react/prop-types": "off",
    "react/jsx-uses-react": "off", // React >=17 doesn't needed it anymore
    "react/react-in-jsx-scope": "off", // React >=17 doesn't needed it anymore
  },
};
