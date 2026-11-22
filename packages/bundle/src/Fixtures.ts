/**
 * Discovers the TypeScript entrypoint fixtures used by the bundle-size tools.
 *
 * The bundle CLI uses these fixture names to build current bundle reports,
 * compare them against a base directory, and populate the visualization
 * selector. Fixtures are discovered from the `bundle` directory of the current
 * working directory (the repository root) as top-level `.ts` files and sorted
 * by name so reports are deterministic.
 *
 * When adding or renaming fixtures, keep in mind that comparison reports match
 * files by basename between the current fixtures directory and the provided
 * base directory. New fixtures without a matching base file are reported as
 * unchanged. Each fixture is bundled as its own Rollup entrypoint, so it should
 * represent the import shape being measured and avoid depending on incidental
 * fixture discovery order.
 *
 * @since 4.0.0
 */
import * as Array from "effect/Array"
import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Order from "effect/Order"
import * as Glob from "glob"
import * as path from "node:path"

/**
 * Discovers the top-level `.ts` fixtures of `fixturesDir`, sorted by name.
 *
 * @category constructors
 * @since 4.0.0
 */
export const makeFixtures = Effect.fnUntraced(function*(fixturesDir: string) {
  const fixtures = yield* Effect.promise(() => Glob.glob("*.ts", { cwd: fixturesDir })).pipe(
    Effect.map(Array.sort(Order.String)),
    Effect.orDie
  )

  return {
    fixtures,
    fixturesDir
  } as const
})

/**
 * Context service that discovers and sorts TypeScript fixture files used by the bundle size tooling.
 *
 * @category services
 * @since 4.0.0
 */
export class Fixtures extends Context.Service<Fixtures>()(
  "@effect-kit/bundle/Fixtures",
  {
    make: Effect.suspend(() => makeFixtures(path.join(process.cwd(), "bundle") + path.sep))
  }
) {
  static readonly layer = Layer.effect(this, this.make)
}
