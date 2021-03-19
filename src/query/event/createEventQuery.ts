import { Context } from "@umk-stat/statistic-server-core";
import { Event } from "../../objects/types";

export async function createEventQuery(
    context: Context,
    name: string,
    targetID: string,
): Promise<Event> {

    const eventDb = await context.clientDatabaseApi.queries.createEvent({
        name,
        targetID,
    });
    return Event.builderFromDb(eventDb.get());

}
