import { Context } from "@umk-stat/statistic-server-core";
import { ViewerTargetTargets } from "../../objects/types";

export async function deleteViewerTargetTargetssQuery(
    context: Context
): Promise<ViewerTargetTargets[]> {

    const viewerTargetTargetssDb = await context.databaseApi.queries.deleteViewerTargetTargetss();
    return viewerTargetTargetssDb
        .map((viewerTargetTargetsDb) => ViewerTargetTargets.builderFromDb(viewerTargetTargetsDb.get()));

}
