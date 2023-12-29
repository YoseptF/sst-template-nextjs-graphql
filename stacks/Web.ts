import { NextjsSite, StackContext, use } from "sst/constructs";
import Graphql from "./Graphql";

const Site = ({ stack }: StackContext) => {
  const graphql = use(Graphql);

  const site = new NextjsSite(stack, "site", {
    path: "packages/web",
    buildCommand: "yarn build",
    environment: {
      NEXT_PUBLIC_GRAPHQL_URL: graphql.url + "/graphql",
    }
  });

  // Show the resource info in the output
  stack.addOutputs({
    SiteUrl: site.url,
  });
}

export default Site;