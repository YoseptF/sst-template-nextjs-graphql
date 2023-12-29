export * as Billboard from "./billboard";

import { ulid } from "ulid";
import { SQL } from "./sql";

interface createArgs {
  description: string;
  title: string;
  userID: string;
}

export async function create(args: createArgs) {
  const [result] = await SQL.DB.insertInto("billboard")
    .values({
      billboardID: ulid(),
      createdAt: new Date(),
      ...args,
    })
    .returningAll()
    .execute();
  return result;
}

export function get(billboardID: string) {
  return SQL.DB.selectFrom("billboard")
    .selectAll()
    .where("billboardID", "=", billboardID)
    .executeTakeFirst();
}

export function list() {
  return SQL.DB.selectFrom("billboard")
    .selectAll()
    .orderBy("createdAt", "desc")
    .execute();
}