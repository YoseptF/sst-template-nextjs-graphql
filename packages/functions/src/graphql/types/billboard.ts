import { Billboard } from "@manager/core/billboard";
import { SQL } from "@manager/core/sql";
import { builder } from "../builder";

const BillboardType = builder.objectRef<SQL.Row["billboard"]>("Billboard").implement({
  fields: (t) => ({
    id: t.exposeID("billboardID"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    userId: t.exposeID("userID"),
    createdAt: t.string({
      resolve: (parent) => parent.createdAt.toISOString(),
    }),
    updatedAt: t.string({
      resolve: (parent) => parent.updatedAt?.toISOString(),
      nullable: true,
    }),
    deletedAt: t.string({
      resolve: (parent) => parent.deletedAt?.toISOString(),
      nullable: true,
    }),
  }),
});

builder.queryFields((t) => ({
  billboard: t.field({
    type: BillboardType,
    args: {
      billboardID: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      const result = await Billboard.get(args.billboardID);

      if (!result) {
        throw new Error("Billboard not found");
      }

      return result;
    },
  }),
  billboards: t.field({
    type: [BillboardType],
    resolve: () => Billboard.list(),
  }),
}));

builder.mutationFields((t) => ({
  createBillboard: t.field({
    type: BillboardType,
    args: {
      title: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      userID: t.arg.string({ required: true }),
    },
    resolve: (_, args) => {
      return Billboard.create({
        ...args,
      });
    },
  }),
}));
