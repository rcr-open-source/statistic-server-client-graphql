import { Context } from "@umk-stat/statistic-server-core";
import { Target } from "../../objects/types";

export async function createTargetQuery(
    context: Context,
    name: string,
    systemID: string,
): Promise<Target> {

    const targetDb = await context.clientDatabaseApi.queries.createTarget({ 
        name,
        systemID,
    });
    return Target.builderFromDb(targetDb.get());

}
