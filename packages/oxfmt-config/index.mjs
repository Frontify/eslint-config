/* (c) Copyright Frontify Ltd., all rights reserved. */

const baseConfig = {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'es5',
    sortPackageJson: false,
    sortImports: {
        newlinesBetween: true,
        groups: [
            'value-builtin',
            'value-external',
            'value-internal',
            'value-parent',
            'value-sibling',
            'value-index',
            'type-import',
            'unknown',
        ],
    },
    ignorePatterns: ['coverage', 'dist', 'build', '**/*.md'],
};

export function defineConfig(overrides = {}) {
    const { ignorePatterns: extraIgnorePatterns, internalPatterns, ...rest } = overrides;

    const sortImports = { ...baseConfig.sortImports };
    if (internalPatterns?.length) {
        sortImports.customGroups = [
            { groupName: 'path-aliases', elementNamePattern: internalPatterns },
        ];
        sortImports.groups = sortImports.groups.map((group) =>
            group === 'value-internal' ? ['path-aliases', 'value-internal'] : group,
        );
    }

    return {
        ...baseConfig,
        ...rest,
        sortImports,
        ignorePatterns: [
            ...baseConfig.ignorePatterns,
            ...(extraIgnorePatterns ?? []),
        ],
    };
}
