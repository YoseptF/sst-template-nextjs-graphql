import { SSTConfig } from "sst";
import Graphql from './stacks/Graphql'
import Web from './stacks/Web'
import Database from './stacks/Database'

export default {
  config(_input) {
    return {
      name: "yosepts-manger",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
    .stack(Database)
    .stack(Graphql)
    .stack(Web)
  },

} satisfies SSTConfig;
