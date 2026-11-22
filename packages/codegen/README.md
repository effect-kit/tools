# @effect-kit/codegen

Generates the export sections of barrel files (`index.ts`) from `@barrel` annotations.
Unofficial fork of Effect's internal `@effect/utils`; see [NOTICE.md](NOTICE.md).

## Install

```sh
pnpm add -D @effect-kit/codegen
```

## Use

Annotate a barrel; everything after the annotation's comment block is regenerated:

```ts
/**
 * @since 0.1.0
 */

// @barrel: Auto-generated exports. Do not edit manually.
```

`// @barrel` exports every `*.ts` module next to the barrel; `// @barrel(Pg*.ts)` takes a glob.
Each module must start with a JSDoc block carrying `@since`; its `@since` (and `@stability`,
outside `internal/`) is copied onto the generated `export * as Module from "./Module.ts"`.

```sh
effect-kit-codegen codegen                                   # src/**/index.ts in the current directory
effect-kit-codegen codegen --cwd packages/core --pattern "src/index.ts"
```
