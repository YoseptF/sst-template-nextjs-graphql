"use client";

import { FC, useMemo } from "react";
import { useTypedMutation, useTypedQuery } from "@manager/graphql/urql";

const Test: FC = () => {
  const context = useMemo(() => ({ additionalTypenames: ["Billboard"] }), []);
  const [{ data: articlesData }, executeQuery] = useTypedQuery("billboards", {
    selection: {
      id: true,
      createdAt: true,
    },
    context
  });

  const [state, executeMutation] = useTypedMutation("createBillboard", {
    variables: {
      description: "test",
      title: "test",
      userID: "1",
    },
    selection: {
      title: true,
    },
    context,
  });

  const getBillboards = async () => {
    console.debug("start fetching");
    const { data: res } = await executeQuery();

    console.debug("res", res);
  };

  const addNewBillboard = async () => {
    const result = await executeMutation({
      variables: {
        title: "test 222",
        description: "test 222",
        userID: "2",
      },
    });
  };

  console.debug("test 3", articlesData?.billboards);

  return (
    <div className="flex gap-3">
      <button
        className="text-xl py-2 px-4 rounded-xl border hover:opacity-75"
        onClick={getBillboards}
      >
        check
      </button>
      <button
        className="text-xl py-2 px-4 rounded-xl border hover:opacity-75"
        onClick={addNewBillboard}
      >
        add
      </button>
    </div>
  );
};

export default Test;