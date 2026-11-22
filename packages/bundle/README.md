# @effect-kit/bundle

Measures the minified, gzipped size of entry-point fixtures with Rollup, and compares two builds.
Unofficial fork of Effect's internal `@effect/bundle`; see [NOTICE.md](NOTICE.md).

## Install

```sh
pnpm add -D @effect-kit/bundle
```

It depends on esbuild, whose install script only verifies its platform binary. With pnpm, deny it
in `pnpm-workspace.yaml` (`allowBuilds: { esbuild: false }`) or approve it; both work.

## Use

Put one fixture per import shape in `bundle/` at the repository root:

```ts
// bundle/schema-decode.ts
import * as Schema from "effect/Schema"

console.log(Schema.decodeUnknownSync(Schema.String)("a"))
```

Run from the repository root after `pnpm build`. Workspace packages whose exports point at `src`
are bundled from their `dist` output.

```sh
effect-kit-bundle report bundle/schema-decode.ts       # sizes of the given fixtures
effect-kit-bundle compare --base-dir <base>/bundle      # every fixture against a base checkout
effect-kit-bundle compare-selected --base-dir <base>/bundle bundle/schema-decode.ts
effect-kit-bundle visualize --output-dir tmp/bundle     # pick fixtures, write treemaps
```

`compare` writes a Markdown table to `--output-path` (default `stats.txt`), suitable for a PR
comment. Fixtures are matched by file name between the two directories.
