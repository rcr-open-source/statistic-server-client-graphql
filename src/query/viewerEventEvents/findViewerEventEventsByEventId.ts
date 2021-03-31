import { Context } from "@umk-stat/statistic-server-core";
import { ViewerEventEvents } from "../../objects/types";

export async function findViewerEventEventsByEventId(
    context: Context,
    eventID: string,
): Promise<ViewerEventEvents[]> {

    const viewerEventEventsDb = await context.clientDatabaseApi.queries.findViewerEventEventsByEventId(eventID);
    return viewerEventEventsDb.map(targetDb => ViewerEventEvents.builderFromDb(targetDb.get()));

}
