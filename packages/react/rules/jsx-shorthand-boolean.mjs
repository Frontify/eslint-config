/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

/** @returns {import('@eslint-react/kit').RuleDefinition} */
export function jsxShorthandBoolean() {
    return (context) => ({
        JSXAttribute(node) {
            const { value } = node;
            if (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                value?.type === 'JSXExpressionContainer' &&
                // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                value.expression.type === 'Literal' &&
                'value' in value.expression &&
                value.expression.value === true
            ) {
                context.report({
                    node,
                    message: 'Use shorthand syntax for boolean JSX props instead of `={true}`.',
                });
            }
        },
    });
}
