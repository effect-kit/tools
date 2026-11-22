# @effect-kit/jsdocs

Checks TSDoc against Effect's documentation conventions and writes a JSON model of every
documented API. Unofficial fork of Effect's internal `@effect/jsdocs`; see [NOTICE.md](NOTICE.md).

## Install

```sh
pnpm add -D @effect-kit/jsdocs
```

It ships its own TypeScript 6, because it reads source through TypeScript's JavaScript API, which
TypeScript 7 does not have. Your project can stay on TypeScript 7.

## Use

`jsdocs.config.json` at the repository root:

```json
{
  "tsconfig": "tsconfig.packages.json",
  "include": ["packages/*/src/*.ts", "packages/*/src/**/*.ts"],
  "exclude": ["**/node_modules/**", "packages/*/src/**/internal/**"],
  "output": ".data/jsdocs.json"
}
```

```sh
effect-kit-jsdocs          # write the model
effect-kit-jsdocs --check  # also exit 1 on any diagnostic (CI)
```

Diagnostics include missing descriptions, `@since`, `@category` and `@stability` tags, unknown
section headings, malformed examples, forbidden tags such as `@example` (use a `**Example**`
section), and imports the package's exports cannot resolve. The model is not rewritten when its
input hash is unchanged.
