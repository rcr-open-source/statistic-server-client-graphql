import { Context } from "@umk-stat/statistic-server-core";
import { Target } from "../../objects/types";

export async function deleteTargetQuery(
    context: Context,
    id: string,
): Promise<Target | null> {

    const targetDb = await context.clientDatabaseApi.queries.deleteTarget(id);
    return targetDb === null ? null : Target.builderFromDb(targetDb.get());

}
