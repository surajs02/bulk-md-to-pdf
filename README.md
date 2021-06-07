# bulk-md-to-pdf
CLI tool wrapper around `md-to-pdf` to convert multiple `.md` notes to `.pdf`.

## Install

```bash
npm install -g bulk-md-to-pdf
```

## Usage

- `build <notesDirPath>` (alias `b`): Converts `*.md` files in `notesDirPath` to `*.pdf` files

    E.g., `bulk-md-to-pdf build ./notes` (or `bulk-md-to-pdf b ./notes`)

- `open-build` (alias `o`): Opens the build folder
- `clean` (alias `c`): Removes all built `*.pdf` files

Example:
```bash
$ pwd
~/test

$ ls
test.md test1.md

$ bulk-md-to-pdf build `pwd`
No build folder found, creating it...
No files to clean in ~/test/build
Converted 2 md files (~/test/) to pdf files (~/test/build/)

$ ls build/
test.pdf  test1.pdf
```

## Testing

Link bin locally: `npm link` (run in project folder root)

CLI should now be available globally via `bulk-md-to-pdf <command> [options]`.

Alternatively, CLI can be used locally through an `npm` script via `npm start <command> [options]`, other `npm` scripts include:
- `npm run build <notesDirPath>`
- `npm run clean`