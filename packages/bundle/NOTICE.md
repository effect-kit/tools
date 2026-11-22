# Notice

This package is an unofficial fork of [`Effect-TS/effect`](https://github.com/Effect-TS/effect),
directory `packages/tools/bundle`, at commit `e3aca1f1484e623cee09b7f3fa18d6ff5d66c0e8`
(tag `effect@4.1.5`). It is not affiliated with or endorsed by Effectful Technologies.

## Changes from upstream

- Renamed to `@effect-kit/bundle`; package metadata points at `effect-kit/tools`.
- Published: `bin` and `exports` resolve to compiled `dist/*.js` (Node does not strip types inside `node_modules`).
- Bin renamed from `effect-bundle` to `effect-kit-bundle`.
- Fixtures are read from `./bundle/` in the current working directory instead of the package's own `fixtures/`, and reported paths are relative to the working directory instead of the Effect repository root. `makeFixtures(dir)` is exported for tests.
- Local `dist` resolution applies to any package whose exports point at `src` TypeScript, not only `effect` and `@effect/*`.
- Effect's fixtures and the esbuild tree-shaking test (which needs Effect's monorepo source) are not included.
- `esbuild` is a dependency (it is the peer of `rollup-plugin-esbuild`).

Re-sync deliberately, in its own commit, and update the commit above.

## Upstream license

```text
MIT License

Copyright (c) 2023 Effectful Technologies Inc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
