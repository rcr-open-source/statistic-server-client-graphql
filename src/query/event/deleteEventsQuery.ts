import { Context } from "@umk-stat/statistic-server-core";
import { Event } from "../../objects/types";

export async function deleteEventsQuery(
    context: Context
): Promise<Event[]> {

    const eventsDb = await context.clientDatabaseApi.queries.deleteEvents();
    return eventsDb.map((eventDb) => Event.builderFromDb(eventDb.get()));

}
