import { Context } from "@umk-stat/statistic-server-core";
import { Event } from "../../objects/types";

export async function eventsQuery(
    context: Context
): Promise<Event[]> {

    const eventsDb = await context.clientDatabaseApi.queries.findEvents();
    return eventsDb.map((eventDb) => Event.builderFromDb(eventDb.get()));

}
