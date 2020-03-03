# bulk-md-to-pdf
Converts md notes to pdf

## Setup

- Link bin locally: `npm link` (run in project folder root)
- *TODO: Support `npm install`*

CLI should now be available globally via `bulk-md-to-pdf <command> [options]`.

Alertnatively, CLI can be used locally without link via `npm start <command> [options]`.

## Commands

- `build <notesDirPath>` (alias `b`): Converts `*.md` files in `notesDirPath` to `*.pdf` files

    E.g., `bulk-md-to-pdf build ./notes` (or `bulk-md-to-pdf b ./notes`)

- `clean` (alias `c`): Removes all built `*.pdf` files
