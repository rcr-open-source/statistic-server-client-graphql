import { Context } from "@umk-stat/statistic-server-core";
import { ViewerTargetTargets } from "../../objects/types";

export async function viewerTargetTargetssQuery(
    context: Context
): Promise<ViewerTargetTargets[]> {

    const viewersTTDb = await context.databaseApi.queries.findViewerTargetTargetss();
    return viewersTTDb.map((viewerTTDb) => ViewerTargetTargets.builderFromDb(viewerTTDb.get()));

}
