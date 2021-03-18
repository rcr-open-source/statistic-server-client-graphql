import { Context } from "@umk-stat/statistic-server-core";
import { Target } from "../../objects/types";

export async function updateTargetQuery(
    context: Context,
    id: string,
    name?: string,
    systemID?: string,
): Promise<Target | null> {

    const targetDb = await context.clientDatabaseApi.queries.updateTarget(id, name, systemID);
    return targetDb === null ? null : Target.builderFromDb(targetDb.get());

}
