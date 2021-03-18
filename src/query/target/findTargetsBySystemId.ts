import { Context } from "@umk-stat/statistic-server-core";
import { Target } from "../../objects/types";

export async function findTargetsBySystemId(
    context: Context,
    id: string,
): Promise<Target[]> {

    const targetsDb = await context.clientDatabaseApi.queries.findTargetsBySystemId(id);
    return targetsDb.map(targetDb => Target.builderFromDb(targetDb.get()));

}
