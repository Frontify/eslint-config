// @ts-check

import basicConfig from '@frontify/eslint-config-basic';
// @ts-expect-error No types available
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintReact from '@eslint-react/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    basicConfig,
    eslintPluginJsxA11y.flatConfigs.recommended,
    eslintReact.configs['recommended-type-checked'],
    {
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        rules: {
            'jsx-quotes': ['error', 'prefer-double'],
            '@eslint-react/no-children-for-each': 'off',
            // 'react/prop-types': 'off',
            // 'react/jsx-no-useless-fragment': 'error',
            // 'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
            // 'react/jsx-no-comment-textnodes': 'warn',
            // 'react/jsx-no-duplicate-props': 'warn',
            // 'react/jsx-no-target-blank': 'warn',
            // 'react/jsx-no-undef': 'error',
            // 'react/jsx-pascal-case': [
            //     'warn',
            //     {
            //         allowAllCaps: true,
            //         ignore: [],
            //     },
            // ],
            // 'react/no-danger-with-children': 'warn',
            // 'react/no-direct-mutation-state': 'warn',
            // 'react/no-is-mounted': 'warn',
            // 'react/no-typos': 'error',
            // 'react/require-render-return': 'error',
        },
    },
    {
        // Test files
        files: [
            '**/*.test.ts',
            '**/*.test.tsx',
            '**/*.test.js',
            '**/*.test.jsx',
            '**/*.spec.ts',
            '**/*.spec.tsx',
            '**/*.spec.js',
            '**/*.spec.jsx',
            '**/*.spec.cy.ts',
            '**/*.spec.cy.tsx',
            '**/*.spec.cy.js',
            '**/*.spec.cy.jsx',
            '**/*.spec.ct.ts',
            '**/*.spec.ct.tsx',
            '**/*.spec.ct.js',
            '**/*.spec.ct.jsx',
        ],
        rules: {
            '@eslint-react/hooks-extra/no-unnecessary-use-prefix': 'off',
        },
    },
);
