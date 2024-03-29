/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    reportUnusedDisableDirectives: true,
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    plugins: ['@typescript-eslint', 'unicorn', 'no-only-tests', 'promise', 'lodash', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:eslint-comments/recommended',
        'plugin:jsonc/recommended-with-json',
        'plugin:yml/standard',
        'plugin:markdown/recommended-legacy',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
    ],
    ignorePatterns: [
        '.next',
        '*.min.*',
        '*.d.ts',
        'CHANGELOG.md',
        'dist',
        'LICENSE*',
        'output',
        'out',
        'coverage',
        'public',
        'temp',
        'package-lock.json',
        'pnpm-lock.yaml',
        'yarn.lock',
        '__snapshots__',
    ],
    parserOptions: {
        project: true,
    },
    parser: '@typescript-eslint/parser',
    settings: {
        'import/resolver': {
            typescript: true,
            node: true,
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
    overrides: [
        {
            excludedFiles: ['**/*.md/*.*'],
            files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
            parserOptions: {
                project: true,
            },
            parser: '@typescript-eslint/parser',
            rules: {
                // As we're using @typescript-eslint it's recommended to turn off
                // the standard eslint rule for unused variables and use the @typescript-eslint rule instead.
                // See here: https://typescript-eslint.io/rules/no-unused-vars/
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

                // Allow overload of functions: https://typescript-eslint.io/rules/no-dupe-class-members/
                'no-dupe-class-members': 'off',
                '@typescript-eslint/no-dupe-class-members': 'error',

                '@typescript-eslint/no-explicit-any': 'warn',
                'no-implied-eval': 'off',
                '@typescript-eslint/no-implied-eval': 'error',
                'dot-notation': 'off',
                '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
                '@typescript-eslint/await-thenable': 'error',
                '@typescript-eslint/no-for-in-array': 'error',
                '@typescript-eslint/no-unnecessary-type-assertion': 'error',
                '@typescript-eslint/no-unsafe-argument': 'error',
                '@typescript-eslint/no-unsafe-call': 'error',
                '@typescript-eslint/no-unsafe-return': 'error',
                'require-await': 'off',
                '@typescript-eslint/require-await': 'error',
                '@typescript-eslint/restrict-plus-operands': 'error',
                '@typescript-eslint/restrict-template-expressions': 'error',
                '@typescript-eslint/unbound-method': 'off',
                '@typescript-eslint/consistent-type-imports': [
                    'error',
                    { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
                ],
                '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false } }],
            },
        },
        {
            files: ['*.json'],
            extends: ['plugin:@typescript-eslint/disable-type-checked'],
            parser: 'jsonc-eslint-parser',
            rules: {
                quotes: ['error', 'double'],
                'quote-props': ['error', 'always'],
                'comma-dangle': ['error', 'never'],
                semi: 'off',
                'jsonc/array-bracket-spacing': ['error', 'never'],
                'jsonc/comma-dangle': ['error', 'never'],
                'jsonc/comma-style': ['error', 'last'],
                'jsonc/key-spacing': ['error', { beforeColon: false, afterColon: true }],
                'jsonc/no-octal-escape': 'error',
                'jsonc/object-curly-newline': ['error', { multiline: true, consistent: true }],
                'jsonc/object-curly-spacing': ['error', 'always'],
                'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
            },
        },
        {
            files: ['*.yaml', '*.yml'],
            parser: 'yaml-eslint-parser',
            rules: {
                'spaced-comment': 'off',
                'yml/quotes': ['error', { prefer: 'single', avoidEscape: false }],
                'yml/no-empty-document': 'off',
                'yml/indent': ['error', 4, { indicatorValueIndent: 2 }],
            },
        },
        {
            files: ['package.json'],
            parser: 'jsonc-eslint-parser',
            extends: ['plugin:@typescript-eslint/disable-type-checked'],
            rules: {
                'jsonc/sort-keys': [
                    'error',
                    {
                        pathPattern: '^$',
                        order: [
                            'publisher',
                            'name',
                            'displayName',
                            'type',
                            'version',
                            'private',
                            'packageManager',
                            'description',
                            'author',
                            'license',
                            'funding',
                            'homepage',
                            'repository',
                            'bugs',
                            'keywords',
                            'categories',
                            'sideEffects',
                            'exports',
                            'main',
                            'module',
                            'unpkg',
                            'jsdelivr',
                            'types',
                            'typesVersions',
                            'bin',
                            'icon',
                            'files',
                            'engines',
                            'activationEvents',
                            'contributes',
                            'scripts',
                            'peerDependencies',
                            'peerDependenciesMeta',
                            'dependencies',
                            'optionalDependencies',
                            'devDependencies',
                            'pnpm',
                            'overrides',
                            'resolutions',
                            'eslintConfig',
                        ],
                    },
                    {
                        pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
                        order: { type: 'asc' },
                    },
                    {
                        pathPattern: '^exports.*$',
                        order: ['types', 'require', 'import'],
                    },
                ],
            },
        },
        {
            files: ['*.js', '*.cjs', '*.jsx'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/no-require-imports': 'off',
            },
        },
        {
            files: ['*.d.ts'],
            rules: {
                'import/no-duplicates': 'off',
            },
        },
        {
            files: ['scripts/**/*.*', 'cli/**/*.*'],
            rules: {
                'no-console': 'off',
            },
        },
        {
            files: [
                '*.test.ts',
                '*.test.tsx',
                '*.test.js',
                '*.test.jsx',
                '*.spec.ts',
                '*.spec.tsx',
                '*.spec.js',
                '*.spec.jsx',
                '*.spec.cy.ts',
                '*.spec.cy.tsx',
                '*.spec.cy.js',
                '*.spec.cy.jsx',
                '*.spec.ct.ts',
                '*.spec.ct.tsx',
                '*.spec.ct.js',
                '*.spec.ct.jsx',
            ],
            rules: {
                'no-unused-expressions': 'off',
                'no-only-tests/no-only-tests': 'error',
                '@typescript-eslint/unbound-method': 'off', // Allows to use `vi.fn()` or spy/mock in tests
            },
        },
        {
            // Code blocks in markdown file
            files: ['**/*.md/*.*'],
            rules: {
                '@typescript-eslint/no-redeclare': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/no-use-before-define': 'off',
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/comma-dangle': 'off',
                '@typescript-eslint/consistent-type-imports': 'off',
                'import/no-unresolved': 'off',
                'unused-imports/no-unused-imports': 'off',
                'unused-imports/no-unused-vars': 'off',
                'no-alert': 'off',
                'no-console': 'off',
                'no-restricted-imports': 'off',
                'no-unused-expressions': 'off',
                'no-unused-vars': 'off',
            },
        },
    ],
    rules: {
        // Eslint prettier
        'prettier/prettier': 'error',
        'arrow-body-style': 'off', // Problematic with Prettier

        // Eslint (base)
        'linebreak-style': ['error', 'unix'],
        'prefer-template': 'error',
        'template-curly-spacing': 'error',
        'no-var': 'error',
        eqeqeq: 'error',
        'no-eval': 'error',
        'no-extra-bind': 'error',
        curly: ['error', 'all'],
        semi: ['error', 'always'],
        quotes: ['error', 'single', { avoidEscape: true }],
        'vars-on-top': 'error',
        'block-scoped-var': 'error',
        'array-callback-return': 'error',
        'no-use-before-define': 'off',
        'object-shorthand': [
            'error',
            'always',
            {
                ignoreConstructors: false,
                avoidQuotes: true,
            },
        ],
        'no-case-declarations': 'error',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-void': 'error',
        'no-invalid-this': 'error',
        'require-await': 'off',
        'no-return-assign': 'off',
        'max-statements-per-line': ['error', { max: 1 }],
        'prefer-exponentiation-operator': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'generator-star-spacing': 'off',
        'no-debugger': 'error',
        'no-constant-condition': 'warn',
        'object-curly-spacing': ['error', 'always'],
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
                ignoreReadBeforeAssign: true,
            },
        ],
        'prefer-arrow-callback': [
            'error',
            {
                allowNamedFunctions: false,
                allowUnboundThis: true,
            },
        ],
        'no-unreachable': 'error',
        'no-unused-labels': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-escape': 'error',
        'no-useless-rename': [
            'error',
            {
                ignoreDestructuring: false,
                ignoreImport: false,
                ignoreExport: false,
            },
        ],
        'no-with': 'error',
        'no-whitespace-before-property': 'error',
        'no-undef': 'off', // Doesn't works well with TypeScript

        // Eslint Comments
        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    markers: ['/'],
                    exceptions: ['/', '#'],
                },
                block: {
                    markers: ['!'],
                    exceptions: ['*'],
                    balanced: true,
                },
            },
        ],

        // Eslint Import
        'import/no-unresolved': 'off',
        'import/no-internal-modules': 'off',
        'import/no-relative-parent-imports': 'off',
        'import/no-named-as-default': 'off',
        'import/exports-last': 'off',
        'import/no-namespace': 'off',
        'import/extensions': 'off',
        'import/namespace': 'off',
        'import/default': 'off',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: false,
                },
            },
        ],
        'import/prefer-default-export': 'off',
        'import/max-dependencies': 'off',
        'import/no-unassigned-import': 'off',
        'import/no-default-export': 'off',
        'import/no-named-export': 'off',
        'import/group-exports': 'off',
        'import/no-duplicates': ['error', { 'prefer-inline': true }],
        'import/consistent-type-specifier-style': ['error', 'prefer-inline'],

        // Unicorn
        // Pass error message when throwing errors
        'unicorn/error-message': 'error',
        // Uppercase regex escapes
        'unicorn/escape-case': 'error',
        // Array.isArray instead of instanceof
        'unicorn/no-instanceof-array': 'error',
        // Prevent deprecated `new Buffer()`
        'unicorn/no-new-buffer': 'error',
        // Keep regex literals safe!
        'unicorn/no-unsafe-regex': 'error',
        // Lowercase number formatting for octal, hex, binary (0x1'error' instead of 0X1'error')
        'unicorn/number-literal-case': 'error',
        // use find when possible
        'unicorn/prefer-array-find': 'error',
        // use default param instead of foo = foo || 'bar';
        'unicorn/prefer-default-parameters': 'error',
        // includes over indexOf when checking for existence
        'unicorn/prefer-includes': 'error',
        // String methods startsWith/endsWith instead of more complicated stuff
        'unicorn/prefer-string-starts-ends-with': 'error',
        // Use replaceAll instead of replace with regex
        'unicorn/prefer-string-replace-all': 'error',
        // textContent instead of innerText
        'unicorn/prefer-text-content': 'error',
        // Enforce throwing type error when throwing error while checking typeof
        'unicorn/prefer-type-error': 'error',
        // Use new when throwing error
        'unicorn/throw-new-error': 'error',
        // Prefer using the `node:` protocol
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/no-array-for-each': 'error',
        'unicorn/custom-error-definition': 'error',
        'unicorn/better-regex': 'error',
        'unicorn/explicit-length-check': 'error',
        'unicorn/no-await-expression-member': 'error',
        'unicorn/no-nested-ternary': 'off', // Conflict with prettier
        'unicorn/no-new-array': 'error',
        'unicorn/no-this-assignment': 'error',
        'unicorn/no-useless-length-check': 'error',
        'unicorn/catch-error-name': 'error',

        // Eslint Promise
        'promise/param-names': 'error',

        // Eslint Jsonc
        'jsonc/no-dupe-keys': 'error',

        // Eslint Lodash
        'lodash/import-scope': [2, 'method'],
    },
};
