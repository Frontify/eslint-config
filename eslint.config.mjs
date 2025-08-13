/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

// @ts-expect-error Untyped
import noticePlugin from 'eslint-plugin-notice';

import frontifyConfig from './packages/basic/eslint.config.mjs';

export default [
    ...frontifyConfig,
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
        plugins: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            notice: noticePlugin,
        },
        rules: {
            // Copyright header rules
            'notice/notice': [
                'error',
                {
                    template: '/* (c) Copyright Frontify Ltd., all rights reserved. */\n\n',
                    messages: {
                        whenFailedToMatch: 'No Frontify copyright header set.',
                    },
                },
            ],
        },
    },
];
