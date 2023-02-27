/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
        '@frontify/eslint-config-typescript',
    ],
    rules: {
        'jsx-quotes': ['error', 'prefer-double'],
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off', // React >=17 doesn't needed it anymore
        'react/react-in-jsx-scope': 'off', // React >=17 doesn't needed it anymore
        'react/jsx-no-useless-fragment': 'error',
    },
};
