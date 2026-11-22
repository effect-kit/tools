import { makeFixtures } from "@effect-kit/bundle/Fixtures"
import { createResolveLocalPackageImports } from "@effect-kit/bundle/Plugins"
import { assert, describe, it } from "@effect/vitest"
import * as Effect from "effect/Effect"
import type * as EffectPath from "effect/Path"
import * as fs from "node:fs/promises"
import * as path from "node:path"
import { fileURLToPath } from "node:url"
import type { Plugin } from "rollup"

type Resolved = {
  readonly id: string
  readonly external: false
}

type ResolveId = (
  this: {
    readonly resolve: (
      source: string,
      importer?: string,
      options?: { readonly skipSelf?: boolean }
    ) => Promise<Resolved | null>
  },
  source: string,
  importer?: string
) => Promise<Resolved | null>

const packageDir = "/workspace/packages/effect"
const bundleDir = fileURLToPath(new URL("..", import.meta.url))
const pathService = path as unknown as EffectPath.Path

const getResolveId = (plugin: Plugin): ResolveId => {
  assert.strictEqual(typeof plugin.resolveId, "function")
  return plugin.resolveId as ResolveId
}

const resolved = (id: string): Resolved => ({
  id,
  external: false
})

describe("createResolveLocalPackageImports", () => {
  it("resolves directory package exports to dist index files", async () => {
    const resolveId = getResolveId(createResolveLocalPackageImports(pathService))
    const result = await resolveId.call({
      resolve: async (source) => {
        switch (source) {
          case "effect/package.json":
            return resolved(path.join(packageDir, "package.json"))
          case "effect/testing":
            return resolved(path.join(packageDir, "src", "testing", "index.ts"))
          default:
            return null
        }
      }
    }, "effect/testing")

    assert.deepStrictEqual(result, resolved(path.join(packageDir, "dist", "testing", "index.js")))
  })

  it("keeps flat package exports on flat dist files", async () => {
    const resolveId = getResolveId(createResolveLocalPackageImports(pathService))
    const result = await resolveId.call({
      resolve: async (source) => {
        switch (source) {
          case "effect/package.json":
            return resolved(path.join(packageDir, "package.json"))
          case "effect/Schema":
            return resolved(path.join(packageDir, "src", "Schema.ts"))
          default:
            return null
        }
      }
    }, "effect/Schema")

    assert.deepStrictEqual(result, resolved(path.join(packageDir, "dist", "Schema.js")))
  })
})

describe("createResolveLocalPackageImports for other packages", () => {
  const scopedDir = "/workspace/packages/permissions"

  it("resolves any workspace package that exports src to dist", async () => {
    const resolveId = getResolveId(createResolveLocalPackageImports(pathService))
    const result = await resolveId.call({
      resolve: async (source) => {
        switch (source) {
          case "@effect-kit/permissions/package.json":
            return resolved(path.join(scopedDir, "package.json"))
          case "@effect-kit/permissions/Grants":
            return resolved(path.join(scopedDir, "src", "Grants.ts"))
          default:
            return null
        }
      }
    }, "@effect-kit/permissions/Grants")

    assert.deepStrictEqual(result, resolved(path.join(scopedDir, "dist", "Grants.js")))
  })

  it("leaves installed packages that already resolve to JavaScript unchanged", async () => {
    const installedDir = "/workspace/node_modules/rollup"
    const resolveId = getResolveId(createResolveLocalPackageImports(pathService))
    const result = await resolveId.call({
      resolve: async (source) => {
        switch (source) {
          case "rollup/package.json":
            return resolved(path.join(installedDir, "package.json"))
          case "rollup":
            return resolved(path.join(installedDir, "dist", "es", "rollup.js"))
          default:
            return null
        }
      }
    }, "rollup")

    assert.deepStrictEqual(result, resolved(path.join(installedDir, "dist", "es", "rollup.js")))
  })

  it("ignores relative and node: specifiers", async () => {
    const resolveId = getResolveId(createResolveLocalPackageImports(pathService))
    const context = { resolve: async () => resolved("/unexpected") }
    assert.strictEqual(await resolveId.call(context, "./local.ts"), null)
    assert.strictEqual(await resolveId.call(context, "node:fs"), null)
  })
})

describe("Fixtures", () => {
  it("discovers fixtures when the directory path contains spaces", async () => {
    const root = await fs.mkdtemp(path.join(bundleDir, ".fixtures-test-"))
    try {
      const fixturesDir = path.join(root, "Effect Work", "bundle") + path.sep
      await fs.mkdir(fixturesDir, { recursive: true })
      await fs.writeFile(path.join(fixturesDir, "b.ts"), "")
      await fs.writeFile(path.join(fixturesDir, "a.ts"), "")
      await fs.writeFile(path.join(fixturesDir, "notes.md"), "")

      assert.deepStrictEqual(await Effect.runPromise(makeFixtures(fixturesDir)), {
        fixtures: ["a.ts", "b.ts"],
        fixturesDir
      })
    } finally {
      await fs.rm(root, { recursive: true, force: true })
    }
  })
})
