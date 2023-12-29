import { RDS, RDSProps, StackContext, } from "sst/constructs";

type ScalingConfig = NonNullable<RDSProps['scaling']>;

const prodConfig: ScalingConfig = {
  autoPause: true,
  minCapacity: "ACU_8",
  maxCapacity: "ACU_64",
};
const devConfig: ScalingConfig = {
  autoPause: true,
  minCapacity: "ACU_2",
  maxCapacity: "ACU_2",
};

const Database = ({ stack, app }: StackContext) => {
  const rds = new RDS(stack, "db", {
    engine: "postgresql11.13",
    defaultDatabaseName: "main",
    migrations: "packages/core/migrations",
    types: "packages/core/src/sql.generated.ts",
    scaling: app.stage === "prod" ? prodConfig : devConfig,
  });

  return rds;
}

export default Database;