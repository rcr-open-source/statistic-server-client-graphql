import { Context } from "@umk-stat/statistic-server-core";
import { ViewerEventEvents } from "../../objects/types";

export async function viewerEventEventsQuery(
    context: Context,
    id: string,
): Promise<ViewerEventEvents | null> {

    const viewerEventEventsDb = await context.clientDatabaseApi.queries.findViewerEventEvents(id);
    return viewerEventEventsDb === null ? null : ViewerEventEvents.builderFromDb(viewerEventEventsDb.get());

}
