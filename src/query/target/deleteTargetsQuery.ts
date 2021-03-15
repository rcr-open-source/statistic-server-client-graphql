import { Context } from "@umk-stat/statistic-server-core";
import { Target } from "../../objects/types";

export async function deleteTargetsQuery(
    context: Context
): Promise<Target[]> {

    const targetsDb = await context.databaseApi.queries.deleteTargets();
    return targetsDb.map((targetDb) => Target.builderFromDb(targetDb.get()));
}
