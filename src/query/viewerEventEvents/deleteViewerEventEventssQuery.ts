import { Context } from "@umk-stat/statistic-server-core";
import { ViewerEventEvents } from "../../objects/types";

export async function deleteViewerEventEventssQuery(
    context: Context
): Promise<ViewerEventEvents[]> {

    const viewerEventEventssDb = await context.clientDatabaseApi.queries.deleteViewerEventEventss();
    return viewerEventEventssDb
        .map((viewerEventEventsDb) => ViewerEventEvents.builderFromDb(viewerEventEventsDb.get()));

}
