import { Dialect, Kysely, Selectable } from "kysely";

import { DataApiDialect } from "kysely-data-api";
import type { Database } from "./sql.generated";
import { PostgresJSDialect } from 'kysely-postgres-js'
import { RDS } from "sst/node/rds";
import { RDSData } from "@aws-sdk/client-rds-data";
import postgres from 'postgres';

// enable is localhost is needed at some point
// right now is cheapo enough to just use the data api
// const dialect = process.env.IS_LOCAL
// ? new PostgresJSDialect({
//   postgres: postgres({
//     database: 'manager',
//     host: 'localhost',
//     max: 10,
//     port: 5432,
//     user: 'manager',
//     password: '1234567',
//   }),
// })
// : new DataApiDialect({
//   mode: "postgres",
//   driver: {
//     secretArn: RDS.db.secretArn,
//     resourceArn: RDS.db.clusterArn,
//     database: RDS.db.defaultDatabaseName,
//     client: new RDSData({}),
//   },
// }) as unknown as Dialect

const dialect = new DataApiDialect({
  mode: "postgres",
  driver: {
    secretArn: RDS.db.secretArn,
    resourceArn: RDS.db.clusterArn,
    database: RDS.db.defaultDatabaseName,
    client: new RDSData({}),
  },
}) as unknown as Dialect

export const DB = new Kysely<Database>({ dialect });

export type Row = {
  [Key in keyof Database]: Selectable<Database[Key]>;
};

export * as SQL from "./sql";
