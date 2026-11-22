import * as path from "node:path"
import { defineConfig, mergeConfig, type ViteUserConfig } from "vitest/config"

const project = (name: string, directory: string, config: ViteUserConfig = {}) => [
  mergeConfig(shared, mergeConfig({ root: directory, test: { name } }, config))
]

export const exclude = [
  "**/.*/**",
  "**/node_modules/**",
  "**/dist/**",
  "**/coverage/**",
  "**/test/fixtures/**",
  "**/test/utils.ts",
  "**/*.d.ts",
  "**/*.config.*",
  "**/vitest.*"
]

const shared: ViteUserConfig = {
  server: {
    watch: {
      ignored: exclude
    }
  },
  resolve: {
    tsconfigPaths: true
  },
  test: {
    exclude,
    passWithNoTests: true,
    setupFiles: [path.join(import.meta.dirname, "vitest.setup.ts")],
    include: ["test/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["html"],
      reportsDirectory: "coverage",
      exclude
    }
  }
}

export default defineConfig({
  test: {
    passWithNoTests: true,
    projects: [
      ...project("scripts", "scripts"),
      ...project("@effect-kit/ai-docgen", "packages/ai-docgen"),
      ...project("@effect-kit/bundle", "packages/bundle"),
      ...project("@effect-kit/codegen", "packages/codegen"),
      ...project("@effect-kit/jsdocs", "packages/jsdocs"),
      ...project("@effect-kit/oxc", "packages/oxc")
    ]
  }
})
