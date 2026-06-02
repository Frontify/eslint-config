/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RuleTester } from 'eslint';
import eslintPluginImportX from 'eslint-plugin-import-x';

import config from '../eslint.config.mjs';

const rule = eslintPluginImportX.rules['order'];

const importOrderEntry = config.find((c) => c?.rules?.['import-x/order'] !== undefined);
if (!importOrderEntry) {
    throw new Error("Could not find 'import-x/order' rule in eslint.config.mjs");
}
const [, orderOptions] = /** @type {[string, import('eslint-plugin-import-x').RuleOptions['order'][1]]} */ (
    importOrderEntry.rules['import-x/order']
);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
});

ruleTester.run('import-x/order', rule, {
    valid: [
        {
            name: 'single external import',
            code: "import foo from 'foo';",
            options: [orderOptions],
        },
        {
            name: 'builtin before external with blank line',
            code: ["import path from 'node:path';", '', "import foo from 'foo';"].join('\n'),
            options: [orderOptions],
        },
        {
            name: 'external imports alphabetized',
            code: ["import alpha from 'alpha';", "import beta from 'beta';", "import zeta from 'zeta';"].join('\n'),
            options: [orderOptions],
        },
        {
            name: 'external before parent with blank line',
            code: ["import foo from 'foo';", '', "import bar from '../bar';"].join('\n'),
            options: [orderOptions],
        },
        {
            name: 'external before sibling with blank line',
            code: ["import foo from 'foo';", '', "import bar from './bar';"].join('\n'),
            options: [orderOptions],
        },
        {
            name: 'all groups in order with blank lines between each',
            code: [
                "import path from 'node:path';",
                '',
                "import foo from 'foo';",
                '',
                "import bar from '../bar';",
                '',
                "import baz from './baz';",
            ].join('\n'),
            options: [orderOptions],
        },
        {
            name: 'scoped externals alphabetized (@frontify before @tanstack)',
            code: [
                "import { Button } from '@frontify/fondue';",
                "import { useQuery } from '@tanstack/react-query';",
            ].join('\n'),
            options: [orderOptions],
        },
        {
            name: 'realistic file: node builtin, scoped externals, deep parent, sibling',
            code: [
                "import path from 'node:path';",
                '',
                "import { Button } from '@frontify/fondue';",
                "import { useQuery } from '@tanstack/react-query';",
                '',
                "import { formatDate } from '../../../utils/date';",
                "import { getUser } from '../../services/user';",
                '',
                "import { MyComponent } from './MyComponent';",
                "import styles from './styles.module.css';",
            ].join('\n'),
            options: [orderOptions],
        },
        {
            name: 'multiple sibling imports alphabetized',
            code: [
                "import { Avatar } from './Avatar';",
                "import { Button } from './Button';",
                "import { Input } from './Input';",
            ].join('\n'),
            options: [orderOptions],
        },
        {
            name: 'deep parent imports (../../../) are treated as parent group',
            code: [
                "import { useQuery } from '@tanstack/react-query';",
                '',
                "import { formatDate } from '../../../utils/date';",
            ].join('\n'),
            options: [orderOptions],
        },
    ],
    invalid: [
        {
            name: 'missing blank line between builtin and external',
            code: ["import path from 'node:path';", "import foo from 'foo';"].join('\n'),
            output: ["import path from 'node:path';", '', "import foo from 'foo';"].join('\n'),
            options: [orderOptions],
            errors: [{ messageId: 'oneLineBetweenGroups' }],
        },
        {
            name: 'missing blank line between external and parent',
            code: ["import foo from 'foo';", "import bar from '../bar';"].join('\n'),
            output: ["import foo from 'foo';", '', "import bar from '../bar';"].join('\n'),
            options: [orderOptions],
            errors: [{ messageId: 'oneLineBetweenGroups' }],
        },
        {
            name: 'missing blank line between external and sibling',
            code: ["import foo from 'foo';", "import bar from './bar';"].join('\n'),
            output: ["import foo from 'foo';", '', "import bar from './bar';"].join('\n'),
            options: [orderOptions],
            errors: [{ messageId: 'oneLineBetweenGroups' }],
        },
        {
            name: 'external imports not alphabetized',
            code: ["import zeta from 'zeta';", "import alpha from 'alpha';"].join('\n'),
            output: ["import alpha from 'alpha';", "import zeta from 'zeta';", ''].join('\n'),
            options: [orderOptions],
            errors: [{ messageId: 'order' }],
        },
        {
            name: 'external before builtin (wrong group order)',
            code: ["import foo from 'foo';", '', "import path from 'node:path';"].join('\n'),
            // One-pass fix swaps the imports; the blank line between groups is added by a second pass.
            output: "import path from 'node:path';\nimport foo from 'foo';\n\n",
            options: [orderOptions],
            errors: [{ messageId: 'order' }],
        },
        {
            name: 'sibling before parent (wrong group order)',
            code: ["import baz from './baz';", '', "import bar from '../bar';"].join('\n'),
            // One-pass fix swaps the imports; the blank line between groups is added by a second pass.
            output: "import bar from '../bar';\nimport baz from './baz';\n\n",
            options: [orderOptions],
            errors: [{ messageId: 'order' }],
        },
        {
            name: 'extra blank line within the same group',
            code: ["import alpha from 'alpha';", '', "import beta from 'beta';"].join('\n'),
            output: ["import alpha from 'alpha';", "import beta from 'beta';"].join('\n'),
            options: [orderOptions],
            errors: [{ messageId: 'noLineWithinGroup' }],
        },
        {
            name: '@tanstack before @frontify (wrong alphabetical order)',
            code: [
                "import { useQuery } from '@tanstack/react-query';",
                "import { Button } from '@frontify/fondue';",
            ].join('\n'),
            output: [
                "import { Button } from '@frontify/fondue';",
                "import { useQuery } from '@tanstack/react-query';",
                '',
            ].join('\n'),
            options: [orderOptions],
            errors: [{ messageId: 'order' }],
        },
        {
            name: 'missing blank line between scoped external and deep parent',
            code: ["import { Button } from '@frontify/fondue';", "import utils from '../../../utils';"].join('\n'),
            output: ["import { Button } from '@frontify/fondue';", '', "import utils from '../../../utils';"].join(
                '\n',
            ),
            options: [orderOptions],
            errors: [{ messageId: 'oneLineBetweenGroups' }],
        },
        {
            name: 'sibling (./Button) before deep parent (../../../utils) — wrong group order',
            code: ["import Button from './Button';", '', "import utils from '../../../utils';"].join('\n'),
            // One-pass fix swaps the imports; the blank line between groups is added by a second pass.
            output: "import utils from '../../../utils';\nimport Button from './Button';\n\n",
            options: [orderOptions],
            errors: [{ messageId: 'order' }],
        },
    ],
});
