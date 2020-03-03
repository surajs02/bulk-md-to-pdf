# bulk-md-to-pdf
Converts md notes to pdf

## Setup

- Install dependencies: `npm install`
- Link bin locally: `npm link` (run in project folder root)
- *TODO: Support `npm install` for package*

CLI should now be available globally via `bulk-md-to-pdf <command> [options]`.

Alternatively, CLI can be used locally through an `npm` script via `npm start <command> [options]`, other `npm` scripts include:
- `npm run build <notesDirPath>`
- `npm run clean`

## Commands

- `build <notesDirPath>` (alias `b`): Converts `*.md` files in `notesDirPath` to `*.pdf` files

    E.g., `bulk-md-to-pdf build ./notes` (or `bulk-md-to-pdf b ./notes`)

- `clean` (alias `c`): Removes all built `*.pdf` files
