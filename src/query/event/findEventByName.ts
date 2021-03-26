import { Context } from "@umk-stat/statistic-server-core";
import { Event } from "../../objects/types";

export async function findEventByName(
    context: Context,
    eventName: string,
): Promise<Event | null> {

    const eventDb = await context.clientDatabaseApi.queries.findEventByName(eventName);
    return eventDb === null ? null : Event.builderFromDb(eventDb.get());

}
