# @effect-kit/oxc

Effect's oxlint rules and lint preset, published for use outside the Effect repository.
Unofficial fork of Effect's internal `@effect/oxc`; see [NOTICE.md](NOTICE.md).

## Install

```sh
pnpm add -D @effect-kit/oxc oxlint
```

## Use

`.oxlintrc.json`:

```json
{
  "extends": ["./node_modules/@effect-kit/oxc/oxlintrc.json"],
  "jsPlugins": ["@effect-kit/oxc/oxlint"],
  "rules": {
    "effect/no-import-from-barrel-package": ["error", {
      "checkPatterns": ["^effect$", "^effect/(.+/)?[a-z][a-z0-9]*$", "^@my-scope/[^/]+$"],
      "checkRelativeIndexImports": true
    }]
  }
}
```

The preset enables oxlint's `correctness`, `suspicious` and `perf` categories plus Effect's rule
set. Redefine `no-import-from-barrel-package` with your own scopes in `checkPatterns`, as above;
the preset checks only `effect` and `@effect/*`.

| Rule                                   | Reports                                                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `effect/no-import-from-barrel-package` | imports from a package barrel (`effect`) instead of the module (`effect/Effect`), and relative `index` imports |
| `effect/no-js-extension-imports`       | relative imports ending in `.js` (use `.ts`)                                                                   |
| `effect/no-unused-internal`            | public signatures that reference `@internal` exports                                                           |
| `effect/no-opaque-instance-fields`     | instance members on `Schema.Opaque` classes                                                                    |
| `effect/no-bigint-literals`            | `1n` literals (use `BigInt(1)`)                                                                                |
