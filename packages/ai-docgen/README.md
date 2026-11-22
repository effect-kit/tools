# @effect-kit/ai-docgen

Builds one Markdown file (such as `LLMS.md`) from a directory tree of runnable TypeScript examples.
Unofficial fork of Effect's internal `@effect/ai-docgen`; see [NOTICE.md](NOTICE.md).

## Install

```sh
pnpm add -D @effect-kit/ai-docgen
```

## Use

```text
ai-docs/src/
  index.md               intro for this level
  01_basics/
    index.md
    010_create.ts        inlined: names starting with 0 become a section with the code
    100_more-examples.ts linked: other names become a link with the JSDoc description
```

Each example may start with a JSDoc block; `@title` sets the heading, the rest is the description.
`fixtures/` directories are skipped.

```sh
effect-kit-ai-docgen ai-docs/src -o LLMS.md
effect-kit-ai-docgen ai-docs/src -o LLMS.md --watch
```
