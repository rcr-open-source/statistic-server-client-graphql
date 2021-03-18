import { Context } from "@umk-stat/statistic-server-core";
import { ViewerEventEvents } from "../../objects/types";

export async function viewerEventEventssQuery(
    context: Context
): Promise<ViewerEventEvents[]> {

    const viewersEEDb = await context.clientDatabaseApi.queries.findViewerEventEventss();
    return viewersEEDb.map((viewerEEDb) => ViewerEventEvents.builderFromDb(viewerEEDb.get()));

}
