/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

import eslint from '@eslint/js';
import eslintPluginMarkdown from '@eslint/markdown';
import eslintPluginComments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintPluginStylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { createNodeResolver, default as eslintPluginImportX } from 'eslint-plugin-import-x';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
// @ts-expect-error No types available
import eslintPluginLodash from 'eslint-plugin-lodash';
// @ts-expect-error No types available
import eslintPluginNoOnlyTests from 'eslint-plugin-no-only-tests';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// @ts-expect-error No types available
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginYml from 'eslint-plugin-yml';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * eslint-plugin-jsonc / eslint-plugin-yml flat presets end with `{ rules }` without `files`, which would apply to every file.
 * Spreading the scoped preset into `defineConfig` matches `{ files, ...preset }` for a single merged object.
 *
 * @param {import('eslint').Linter.Config[]} preset
 * @param {{ files: string[], ignores?: string[], language?: string }} scope
 */
function scopeFlatPreset(preset, scope) {
    const { files, ignores, language } = scope;
    return preset.map((config) => {
        if (config.rules !== undefined && config.files === undefined) {
            return {
                ...config,
                files,
                ...(ignores?.length ? { ignores } : {}),
            };
        }
        if (language !== undefined && 'language' in config && Array.isArray(config.files)) {
            return {
                ...config,
                files,
                ...(ignores?.length ? { ignores } : {}),
                language,
            };
        }
        return config;
    });
}

const jsonWithCommentsPatterns = ['**/*.jsonc', '**/.vscode/**/*.json', '**/tsconfig.json', '**/tsconfig.*.json'];

const strictJsonScope = {
    files: ['**/*.json'],
    ignores: ['**/package-lock.json', ...jsonWithCommentsPatterns],
    language: 'jsonc/json',
};

const yamlScope = {
    files: ['**/*.yaml', '**/*.yml'],
    ignores: ['**/pnpm-lock.yaml', '**/yarn.lock'],
    language: 'yml/yaml',
};

export default defineConfig(
    {
        ...eslint.configs.recommended,
        files: ['**/*.{js,mjs,cjs,jsx}'],
    },
    tseslint.configs.recommendedTypeChecked,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    eslintPluginPromise.configs['flat/recommended'],
    eslintPluginComments.recommended,
    ...scopeFlatPreset(eslintPluginJsonc.configs['flat/recommended-with-json'], strictJsonScope),
    ...scopeFlatPreset(eslintPluginJsonc.configs['flat/prettier'], strictJsonScope),
    {
        ...strictJsonScope,
        extends: [tseslint.configs.disableTypeChecked],
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
            'jsonc/no-dupe-keys': 'error',
            'jsonc/sort-keys': ['warn', 'asc'],
        },
    },
    ...scopeFlatPreset(eslintPluginJsonc.configs['flat/recommended-with-jsonc'], {
        files: jsonWithCommentsPatterns,
        language: 'jsonc/jsonc',
    }),
    ...scopeFlatPreset(eslintPluginJsonc.configs['flat/prettier'], {
        files: jsonWithCommentsPatterns,
        language: 'jsonc/jsonc',
    }),
    {
        files: jsonWithCommentsPatterns,
        language: 'jsonc/jsonc',
        extends: [tseslint.configs.disableTypeChecked],
    },
    ...scopeFlatPreset(eslintPluginJsonc.configs['flat/recommended-with-json5'], {
        files: ['**/*.json5'],
        language: 'jsonc/json5',
    }),
    ...scopeFlatPreset(eslintPluginJsonc.configs['flat/prettier'], {
        files: ['**/*.json5'],
        language: 'jsonc/json5',
    }),
    {
        files: ['**/*.json5'],
        language: 'jsonc/json5',
        extends: [tseslint.configs.disableTypeChecked],
    },
    ...scopeFlatPreset(eslintPluginYml.configs['flat/recommended'], yamlScope),
    ...scopeFlatPreset(eslintPluginYml.configs['flat/prettier'], yamlScope),
    {
        ...yamlScope,
        extends: [tseslint.configs.disableTypeChecked],
        rules: {
            'yml/quotes': ['error', { prefer: 'single', avoidEscape: false }],
            'yml/no-empty-document': 'off',
            'yml/indent': ['error', 4, { indicatorValueIndent: 2 }],
            '@stylistic/spaced-comment': 'off',
            'yml/no-empty-mapping-value': 'off',
        },
    },
    {
        files: ['**/*.md'],
        plugins: { markdown: eslintPluginMarkdown },
        extends: ['markdown/recommended'],
    },
    {
        // General configuration for JS/TS source (not JSON, YAML, Markdown, etc.)
        files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}'],
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        extends: [eslintPluginImportX.flatConfigs.typescript],
        plugins: {
            // Where we want to customize few part and not use recommended
            unicorn: eslintPluginUnicorn,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            lodash: eslintPluginLodash,
            '@stylistic': eslintPluginStylistic,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                projectService: true,
            },
        },
        settings: {
            'import-x/resolver-next': [createTypeScriptImportResolver(), createNodeResolver()],
        },
        rules: {
            // Eslint (base)
            '@stylistic/linebreak-style': ['error', 'unix'],
            '@stylistic/eol-last': ['error', 'always'],
            'prefer-template': 'error',
            '@stylistic/template-curly-spacing': 'error',
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

            // Comments
            '@stylistic/spaced-comment': [
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
            'import-x/no-unresolved': 'off',
            'import-x/no-internal-modules': 'off',
            'import-x/no-relative-parent-imports': 'off',
            'import-x/no-named-as-default': 'off',
            'import-x/exports-last': 'off',
            'import-x/no-namespace': 'off',
            'import-x/extensions': 'off',
            'import-x/namespace': 'off',
            'import-x/default': 'off',
            'import-x/order': [
                'error',
                {
                    groups: [
                        // node builtin
                        'builtin',
                        // npm libraries
                        'external',
                        // same scope libraries
                        'internal',
                        // parent imports
                        'parent',
                        // siblings imports
                        'sibling',
                        'index',
                        'object',
                        'type',
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: false,
                    },
                },
            ],
            'import-x/prefer-default-export': 'off',
            'import-x/max-dependencies': 'off',
            'import-x/no-unassigned-import': 'off',
            'import-x/no-default-export': 'off',
            'import-x/no-named-export': 'off',
            'import-x/group-exports': 'off',
            'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
            'import-x/consistent-type-specifier-style': ['error', 'prefer-inline'],

            // Unicorn
            // Pass error message when throwing errors
            'unicorn/error-message': 'error',
            // Uppercase regex escapes
            'unicorn/escape-case': 'error',
            // Array.isArray instead of instanceof
            'unicorn/no-instanceof-array': 'error',
            // Prevent deprecated `new Buffer()`
            'unicorn/no-new-buffer': 'error',
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
            'unicorn/prefer-dom-node-text-content': 'error',
            // Enforce throwing type error when throwing error while checking typeof
            'unicorn/prefer-type-error': 'error',
            // Use new when throwing error
            'unicorn/throw-new-error': 'error',
            // Prefer using the `node:` protocol
            'unicorn/prefer-node-protocol': 'error',
            'unicorn/no-array-for-each': 'error',
            'unicorn/custom-error-definition': 'error',
            'unicorn/explicit-length-check': 'error',
            'unicorn/no-await-expression-member': 'error',
            'unicorn/no-nested-ternary': 'off', // Conflict with prettier
            'unicorn/no-new-array': 'error',
            'unicorn/no-this-assignment': 'error',
            'unicorn/no-useless-length-check': 'error',
            'unicorn/catch-error-name': 'error',

            // Eslint Promise
            'promise/param-names': 'error',
        },
    },
    {
        // TypeScript files
        files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
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
        // package.json rules
        files: ['**/package.json'],
        extends: [tseslint.configs.disableTypeChecked],
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
        // d.ts files
        files: ['**/*.d.ts'],
        rules: {
            'import-x/no-duplicates': 'off',
        },
    },
    {
        // Scripts and cli files
        files: ['scripts/**/*', 'cli/**/*'],
        rules: {
            'no-console': 'off',
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
        plugins: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            'no-only-tests': eslintPluginNoOnlyTests,
        },
        rules: {
            'no-unused-expressions': 'off',
            'no-only-tests/no-only-tests': 'error',
            '@typescript-eslint/unbound-method': 'off', // Allows to use `vi.fn()` or spy/mock in tests
        },
    },
    {
        ignores: [
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
    },
    eslintPluginPrettierRecommended,
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
        rules: {
            curly: ['error', 'all'], // Override Prettier feelings about curly braces.
        },
    },
);
