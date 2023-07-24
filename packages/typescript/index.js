/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'prettier', '@frontify/eslint-config-basic'],
    rules: {
        // As we're using @typescript-eslint it's recommended to turn off
        // the standard eslint rule for unused variables and use the @typescript-eslint rule instead.
        // See here: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',

        '@typescript-eslint/no-explicit-any': 'warn',
    },
};
