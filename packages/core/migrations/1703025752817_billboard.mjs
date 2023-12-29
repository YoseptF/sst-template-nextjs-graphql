import { Kysely, sql } from "kysely";


/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("billboard")
    .addColumn("billboardID", "text", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updatedAt", "timestamp")
    .addColumn("deletedAt", "timestamp")
    .addColumn("userID", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("idx_billboard_created")
    .on("billboard")
    .column("createdAt")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropIndex("idx_billboard_created").execute();
  await db.schema.dropTable("billboard").execute();
}