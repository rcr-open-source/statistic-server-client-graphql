import { Context } from "@umk-stat/statistic-server-core";
import { Event } from "../../objects/types";

export async function deleteEventQuery(
    context: Context,
    id: string,
): Promise<null | Event> {

    const eventDb = await context.databaseApi.queries.deleteEvent(id);
    return eventDb === null ? null : Event.builderFromDb(eventDb.get());

}
