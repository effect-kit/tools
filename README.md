# effect-kit/tools

Effect's internal repository tools, published for use outside the Effect repository. Each package
is an unofficial fork of a directory under
[`Effect-TS/effect/packages/tools`](https://github.com/Effect-TS/effect/tree/main/packages/tools),
changed only where publishing requires it; each `NOTICE.md` lists the upstream commit and changes.

| Package                                       | What it does                                                          | Upstream            |
| --------------------------------------------- | --------------------------------------------------------------------- | ------------------- |
| [`@effect-kit/oxc`](packages/oxc)             | oxlint JS plugin with Effect's rules, plus Effect's lint preset       | `@effect/oxc`       |
| [`@effect-kit/jsdocs`](packages/jsdocs)       | Checks TSDoc against Effect's conventions and writes a JSON API model | `@effect/jsdocs`    |
| [`@effect-kit/codegen`](packages/codegen)     | Generates `@barrel` export sections of `index.ts` files               | `@effect/utils`     |
| [`@effect-kit/bundle`](packages/bundle)       | Measures and compares the gzipped bundle size of fixtures             | `@effect/bundle`    |
| [`@effect-kit/ai-docgen`](packages/ai-docgen) | Builds `LLMS.md` from a tree of runnable examples                     | `@effect/ai-docgen` |

Not affiliated with or endorsed by Effectful Technologies.

## Development

Requires Node.js 26 (`.node-version`) and pnpm 12.

```sh
pnpm install
pnpm check          # types (tsrs)
pnpm lint           # oxlint + dprint
pnpm test --run     # tests
pnpm build          # tsc -b + pure-call annotations
pnpm ci:check       # everything CI runs
```

See [`.agents/AGENTS.md`](.agents/AGENTS.md) for the validation table, vendoring rules and releases.

## License

MIT. The vendored code is Copyright (c) 2023 Effectful Technologies Inc; see each package's
`LICENSE` and `NOTICE.md`.
