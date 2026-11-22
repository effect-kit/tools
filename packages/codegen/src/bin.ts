#!/usr/bin/env node

import * as NodeServices from "@effect/platform-node/NodeServices"
import * as Command from "effect/cli/Command"
import * as Effect from "effect/Effect"
import PackageJson from "../package.json" with { type: "json" }
import { codegen } from "./commands/codegen.ts"

const cli = Command.make("effect-kit-codegen").pipe(
  Command.withSubcommands([codegen])
)

const main = Command.run(cli, { version: PackageJson["version"] }).pipe(
  Effect.provide(NodeServices.layer)
)

Effect.runPromise(main)
