/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    plugins: ['html', 'unicorn', 'prettier'],
    extends: ['plugin:jsonc/recommended-with-jsonc', 'plugin:prettier/recommended'],
    overrides: [
        {
            files: ['*.json', '*.json5'],
            parser: 'jsonc-eslint-parser',
            rules: {
                quotes: ['error', 'double'],
                'quote-props': ['error', 'always'],
                'comma-dangle': ['error', 'never'],
            },
        },
        {
            files: ['*.yaml', '*.yml'],
            parser: 'yaml-eslint-parser',
        },
        {
            files: ['package.json'],
            parser: 'jsonc-eslint-parser',
            rules: {
                'jsonc/sort-keys': [
                    'error',
                    {
                        pathPattern: '^$',
                        order: [
                            'name',
                            'version',
                            'description',
                            'keywords',
                            'license',
                            'repository',
                            'funding',
                            'author',
                            'type',
                            'files',
                            'exports',
                            'main',
                            'module',
                            'unpkg',
                            'bin',
                            'scripts',
                            'husky',
                            'lint-staged',
                            'peerDependencies',
                            'peerDependenciesMeta',
                            'dependencies',
                            'devDependencies',
                            'eslintConfig',
                        ],
                    },
                    {
                        pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
                        order: { type: 'asc' },
                    },
                ],
            },
        },
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
        {
            files: ['scripts/**/*.*'],
            rules: {
                'no-console': 'off',
            },
        },
        {
            files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
            rules: {
                'no-unused-expressions': 'off',
            },
        },
    ],
    rules: {
        'linebreak-style': ['error', 'unix'],
        'prefer-template': 'error',
        'template-curly-spacing': 'error',
        'no-useless-concat': 'error',
        'prefer-arrow-callback': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        eqeqeq: 'error',
        'no-eval': 'error',
        'no-extra-bind': 'error',
        curly: ['error', 'all'],
        semi: ['error', 'always'],
        quotes: ['error', 'single', { avoidEscape: true }],
        'vars-on-top': 'error',
        'block-scoped-var': 'error',
        'array-callback-return': 'error',
        'object-shorthand': [
            'error',
            'always',
            {
                ignoreConstructors: false,
                avoidQuotes: true,
            },
        ],

        'unicorn/error-message': 'error',
        'unicorn/escape-case': 'error',
        'unicorn/no-array-instanceof': 'error',
        'unicorn/no-new-buffer': 'error',
        'unicorn/no-unsafe-regex': 'off',
        'unicorn/number-literal-case': 'error',
        'unicorn/prefer-exponentiation-operator': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-starts-ends-with': 'error',
        'unicorn/prefer-text-content': 'error',
        'unicorn/prefer-type-error': 'error',
        'unicorn/throw-new-error': 'error',
        'unicorn/prefer-string-replace-all': 'error',
        'unicorn/prefer-default-parameters': 'error',
        'unicorn/prefer-array-find': 'error',
        'unicorn/no-array-for-each': 'error',
        'unicorn/error-message': 'error',
        'unicorn/custom-error-definition': 'error',
        'unicorn/better-regex': 'error',
        'unicorn/explicit-length-check': 'error',
        'unicorn/no-await-expression-member': 'error',
        'unicorn/no-nested-ternary': 'error',
        'unicorn/no-new-array': 'error',
        'unicorn/no-this-assignment': 'error',
        'unicorn/no-unsafe-regex': 'error',
        'unicorn/no-useless-length-check': 'error',

        'sort-imports': [
            'error',
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                allowSeparatedGroups: false,
            },
        ],
    },
};
