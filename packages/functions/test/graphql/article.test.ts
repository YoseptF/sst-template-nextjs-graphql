import { expect, it } from "vitest";

import { Api } from "sst/node/api";
import { Billboard } from "@manager/core/billboard";
import { createClient } from "@manager/graphql/genql";

it("create an billboard", async () => {
  const client = createClient({
    url: Api.api.url + "/graphql",
  });

  const billboard = await client.mutation({
    createBillboard: [
      { title: "Hello world", url: "https://example.com" },
      {
        id: true,
      },
    ],
  });
  const list = await Billboard.list();
  expect(
    list.find((a) => a.billboardID === billboard.createBillboard.id)
  ).not.toBeNull();
});
