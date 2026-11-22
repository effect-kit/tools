# Notice

This package is an unofficial fork of [`Effect-TS/effect`](https://github.com/Effect-TS/effect),
directory `packages/tools/oxc`, at commit `e3aca1f1484e623cee09b7f3fa18d6ff5d66c0e8`
(tag `effect@4.1.5`). It is not affiliated with or endorsed by Effectful Technologies.

## Changes from upstream

- Renamed to `@effect-kit/oxc`; package metadata points at `effect-kit/tools`.
- Published: `bin` and `exports` resolve to compiled `dist/*.js` (Node does not strip types inside `node_modules`).
- `typescript@^6` is a dependency instead of a peer, because `no-unused-internal` needs TypeScript's JavaScript API, which TypeScript 7 does not have.
- `oxlint` is a peer dependency.

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
