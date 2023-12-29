import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Billboard {
  billboardID: string;
  title: string;
  description: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp | null;
  deletedAt: Timestamp | null;
  userID: string;
}

export interface Comment {
  commentID: string;
  articleID: string;
  text: string;
}

export interface Database {
  billboard: Billboard;
  comment: Comment;
}
