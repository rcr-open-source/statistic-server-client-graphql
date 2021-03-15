import { Context } from "@umk-stat/statistic-server-core";
import { Target } from "../../objects/types";

export async function targetsQuery(
    context: Context
): Promise<Target[]> {

    const targetsDb = await context.databaseApi.queries.findTargets();
    return targetsDb.map((targetDb) => Target.builderFromDb(targetDb.get()));

}
