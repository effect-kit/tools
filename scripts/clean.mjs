import * as Glob from "glob"
import * as Fs from "node:fs"

for (const dir of [".", ...Glob.sync("packages/*/")]) {
  for (const file of ["tsconfig.tsbuildinfo", "tsconfig.src.tsbuildinfo", "dist", "coverage", "tmp"]) {
    Fs.rmSync(`${dir}/${file}`, { recursive: true, force: true })
  }
}
