# Frontify code style configurations

This repository contains all Frontify code style configurations for its projects.

## Usage

The configurations are published in 4 different flavors:

- `@frontify/eslint-config-basic`: The base ESLint configuration including JavaScript and TypeScript rules.
- `@frontify/eslint-config-react`: The base ESLint configuration including React rules.
- `@frontify/oxlint-config-basic`: The base oxlint configuration including JavaScript and TypeScript rules.
- `@frontify/oxlint-config-react`: The base oxlint configuration including React rules.

Types aware rules are enabled on all configurations, you will need to define the `tsconfig.json` file in your project and set the path to it in the configuration file ([`parserOptions.project`](https://typescript-eslint.io/packages/parser/#project)).

## Publish a new version

This repository uses [Changeset](https://github.com/changesets/changesets) to generate the changelog file.

To publish a new version, you need to generate a changeset (`pnpm changeset`).
