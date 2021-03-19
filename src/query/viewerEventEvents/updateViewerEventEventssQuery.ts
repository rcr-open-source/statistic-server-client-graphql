import { Context } from "@umk-stat/statistic-server-core";
import { ViewerEventEvents } from "../../objects/types";

export async function updateViewerEventEventsQuery(
    context: Context,
    id: string,
    viewerID?: string,
    eventID?: string,
    time?: Date,
): Promise<null | ViewerEventEvents> {

    const viewerEventEventsDb = await context.clientDatabaseApi.queries.updateViewerEventEvents(id, viewerID, eventID, time);
    return viewerEventEventsDb === null ? null : ViewerEventEvents.builderFromDb(viewerEventEventsDb.get());

}


