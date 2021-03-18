import { Context } from "@umk-stat/statistic-server-core";
import { ViewerEventEvents } from "../../objects/types";

export async function deleteViewerEventEventsQuery(
    context: Context,
    id: string,
): Promise<null | ViewerEventEvents> {

    const viewerEventEventsDb = await context.clientDatabaseApi.queries.deleteViewerEventEvents(id);
    return viewerEventEventsDb === null ? null : ViewerEventEvents.builderFromDb(viewerEventEventsDb.get());

}
