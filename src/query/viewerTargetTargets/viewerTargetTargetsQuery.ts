import { Context } from "@umk-stat/statistic-server-core";
import { ViewerTargetTargets } from "../../objects/types";

export async function viewerTargetTargetsQuery(
    context: Context,
    id: string,
): Promise<ViewerTargetTargets | null> {

    const viewerTargetTargetsDb = await context.databaseApi.queries.findViewerTargetTargets(id);
    return viewerTargetTargetsDb === null ? null : ViewerTargetTargets.builderFromDb(viewerTargetTargetsDb.get());

}
