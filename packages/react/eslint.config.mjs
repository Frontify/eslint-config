// @ts-check

import eslintReact from '@eslint-react/eslint-plugin';
import basicConfig from '@frontify/eslint-config-basic';
// @ts-expect-error No types available
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    basicConfig,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
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
            'no-restricted-syntax': [
                'error',
                {
                    selector:
                        "ImportDeclaration[source.value='react'] :matches(ImportDefaultSpecifier, ImportNamespaceSpecifier)",
                    message:
                        'Default React import not allowed since we use the TypeScript jsx-transform. If you need a global type that collides with a React named export (such as `MouseEvent`), try using `globalThis.MouseHandler`.',
                },
            ],
            'jsx-quotes': ['error', 'prefer-double'],
            '@eslint-react/no-children-for-each': 'off',
            '@eslint-react/no-children-count': 'off',
            '@eslint-react/no-children-map': 'off',
            '@eslint-react/no-children-to-array': 'off',
            '@eslint-react/no-class-component': 'error',
            '@eslint-react/no-complex-conditional-rendering': 'error',
            '@eslint-react/no-create-ref': 'error',
            '@eslint-react/no-duplicate-key': 'error',
            '@eslint-react/no-implicit-key': 'error',
            '@eslint-react/no-leaked-conditional-rendering': 'error',
            '@eslint-react/no-missing-component-display-name': 'warn',
            '@eslint-react/no-missing-context-display-name': 'error',
            '@eslint-react/no-unstable-context-value': 'error',
            '@eslint-react/no-useless-fragment': 'error',
            '@eslint-react/prefer-shorthand-boolean': 'error',
            '@eslint-react/prefer-react-namespace-import': 'error',
            '@eslint-react/dom/no-missing-button-type': 'error',
            '@eslint-react/dom/no-missing-iframe-sandbox': 'error',
            '@eslint-react/hooks-extra/no-unnecessary-use-callback': 'error',
            '@eslint-react/hooks-extra/no-unnecessary-use-memo': 'error',
            '@eslint-react/hooks-extra/no-unnecessary-use-prefix': 'error',
            '@eslint-react/hooks-extra/prefer-use-state-lazy-initialization': 'error',
            '@eslint-react/naming-convention/component-name': ['error', 'PascalCase'],
            '@eslint-react/naming-convention/context-name': 'error',
            '@eslint-react/naming-convention/filename-extension': ['warn', 'as-needed'],
            '@eslint-react/naming-convention/use-state': 'error',
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
