This repository publishes Effect's internal repository tools as `@effect-kit/*`. The git base branch is `main`; use
`pnpm` from the repository root.

## Layout

- `packages/<name>`: one published package per tool, vendored from `Effect-TS/effect` `packages/tools/*`. Each
  `NOTICE.md` names the upstream directory and commit, and lists every change from upstream.
- `scripts/`: repository scripts; `scripts/release/` is the `release check|smoke` CLI the release workflow runs.
- `scratchpad/`: ad hoc probes (`scratchpad/<name>.ts`, run with plain `node`, deleted afterwards; ignored by git).
- `.changeset/`: changesets. `.github/workflows/`: CI plus callers of the shared `effect-kit/.github` workflows.

## Vendored code

- Keep upstream code as it is. Change it only where publishing outside the Effect repository requires it, and add
  every change to the package's `NOTICE.md`.
- Re-sync from upstream in its own commit: copy the upstream directory at a tagged `effect@x.y.z` commit, reapply the
  `NOTICE.md` changes, update the commit in every `NOTICE.md`, and add a changeset.
- Never publish under `@effect/*` or describe a package as official.

## Validation

| Change type          | Validation                                                                |
| -------------------- | ------------------------------------------------------------------------- |
| Package source       | `pnpm lint-fix`, targeted `pnpm test --run <test_file.ts>`, `pnpm check`  |
| Package exports/bins | `pnpm build`, `pnpm check-dist-types`, then a local release check (below) |
| Release CLI          | `pnpm test --run scripts`, `pnpm check`                                   |
| Docs only            | `pnpm lint-fix`                                                           |

`pnpm check` type-checks with tsrs; `pnpm check-tsc` runs the official `tsc` and is for CI. Never run bare
`pnpm test`: it starts watch mode. `pnpm ci:check` runs everything CI runs.

Local release check, which installs the packed tarballs into a throwaway project, imports every public entry and runs
every bin with `--help`:

```sh
pnpm build && pnpm release:pack && pnpm release:check --pack-dir tmp/release
```

Report any command that could not be run.

## Releases

One changeset per PR (`pnpm changeset`), one sentence naming the tool and what users notice. Packages version
independently. Releases run from GitHub: dispatch **Release** (dry run by default) to open the version PR, merge it,
then dispatch again to publish with npm trusted publishing and provenance.
