import fs from "fs/promises";
import path from "path";
import { match, P } from 'ts-pattern'
import { Migrator, FileMigrationProvider } from "kysely";
import { DB } from "./sql";

const migrator = new Migrator({
  db: DB,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.resolve("./migrations"),
  }),
});


const command = process.argv[2];

const resetDB = async () => {
  let { results } = await migrator.migrateDown();

  while (results && results.length > 0) {
    ({ results } = await migrator.migrateDown() || []);
  }

  console.debug("migrating back up");

  return await migrator.migrateToLatest();
}

const run = async () => {
  return match(command)
    .with("reset", async () => {
      console.log("resetting db");
      return await resetDB();
    })
    .with("up", async () => {
      console.log("migrating up");
      return await migrator.migrateUp();
    })
    .with("down", async () => {
      console.log("migrating down");
      return await migrator.migrateDown();
    })
    .with("latest", async () => {
      console.log("migrating to latest");
      return await migrator.migrateToLatest();
    })
    .with(P.nullish, async () => {
      throw new Error("no command provided");
    })
    .otherwise(async (cmd) => {
      console.log(`migrating to ${cmd}`);
      return migrator.migrateTo(cmd);
    });
}

const results = await run();
if (results) console.log(results);

process.exit(0);
