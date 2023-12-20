# Frontify ESLint configurations

This repository contains all Frontify ESLint configurations for its projects.

## Usage

The configurations are published in 3 different flavors:
- `@frontify/eslint-config-basic`: The base configuration including JavaScript and TypeScript rules.
- `@frontify/eslint-config-react`: The base configuration including React rules.
- `@frontify/eslint-config-vue2`: The base configuration plus Vue 2 rules.

Types aware rules are enabled on all 3 configurations, you will need to define the `tsconfig.json` file in your project and set the path to it in the ESLint Config file ([`parserOptions.project`](https://typescript-eslint.io/packages/parser/#project)).

## Publish a new version

This repository uses [Changeset](https://github.com/changesets/changesets) to generate the changelog file.

To publish a new version, you need to generate a changeset (`pnpm changeset`).
