/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/strict',
        '@frontify/eslint-config-basic',
    ],
    rules: {
        'jsx-quotes': ['error', 'prefer-double'],
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off', // React >=17 doesn't needed it anymore
        'react/react-in-jsx-scope': 'off', // React >=17 doesn't needed it anymore
        'react/jsx-no-useless-fragment': 'error',
        'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
        'react/jsx-no-comment-textnodes': 'warn',
        'react/jsx-no-duplicate-props': 'warn',
        'react/jsx-no-target-blank': 'warn',
        'react/jsx-no-undef': 'error',
        'react/jsx-pascal-case': [
            'warn',
            {
                allowAllCaps: true,
                ignore: [],
            },
        ],
        'react/no-danger-with-children': 'warn',
        'react/no-direct-mutation-state': 'warn',
        'react/no-is-mounted': 'warn',
        'react/no-typos': 'error',
        'react/require-render-return': 'error',
    },
};
