import eslintReactKit from '@eslint-react/kit';
import { RuleTester } from 'eslint';

import { jsxShorthandBoolean } from './jsx-shorthand-boolean.mjs';

const plugin = eslintReactKit().use(jsxShorthandBoolean).getPlugin();
const rule = plugin.rules['jsx-shorthand-boolean'];

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaFeatures: { jsx: true },
        },
    },
});

ruleTester.run('jsx-shorthand-boolean', rule, {
    valid: [{ code: '<Foo bar />' }, { code: '<Foo bar={false} />' }, { code: '<Foo bar={someVariable} />' }],
    invalid: [
        {
            code: '<Foo bar={true} />',
            errors: [
                {
                    message: 'Use shorthand syntax for boolean JSX props instead of `={true}`.',
                },
            ],
        },
        {
            code: '<Foo bar={true} baz="hello" />',
            errors: [
                {
                    message: 'Use shorthand syntax for boolean JSX props instead of `={true}`.',
                },
            ],
        },
    ],
});
