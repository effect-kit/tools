import { Command } from "effect/cli"

import { circular } from "./commands/circular.ts"
import { clean } from "./commands/clean.ts"
import { distTypes } from "./commands/distTypes.ts"
import { lint } from "./commands/lint.ts"
import { release } from "./commands/release.ts"

/** `node scripts/bin.ts <command>`: the repository's tooling, run from the repository root. */
export const cli = Command.make("scripts").pipe(
  Command.withDescription("Repository tooling for effect-kit/tools, run from the repository root"),
  Command.withSubcommands([circular, clean, distTypes, lint, release])
)
