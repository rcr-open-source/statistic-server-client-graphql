import { Context } from "@umk-stat/statistic-server-core";
import { ViewerTargetTargets } from "../../objects/types";

export async function createViewerTargetTargetsQuery(
    context: Context,
    targetID: string,
    viewerID: string
): Promise<ViewerTargetTargets> {

    const viewerTargetTargetsDb = await context.databaseApi.queries.createViewerTargetTargets({
        targetID,
        viewerID,
    });
    return ViewerTargetTargets.builderFromDb(viewerTargetTargetsDb.get());

}
