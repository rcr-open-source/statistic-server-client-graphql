import { Context } from "@umk-stat/statistic-server-core";
import { ViewerEventEvents } from "../../objects/types";

export async function createViewerEventEventsQuery(
    context: Context,
    eventID: string,
    viewerID: string
): Promise<ViewerEventEvents> {

    const viewerEventEventsDb = await context.clientDatabaseApi.queries.createViewerEventEvents({
        eventID,
        viewerID,
    });
    return ViewerEventEvents.builderFromDb(viewerEventEventsDb.get());

}
