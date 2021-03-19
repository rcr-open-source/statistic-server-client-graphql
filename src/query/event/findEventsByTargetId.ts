import { Context } from "@umk-stat/statistic-server-core";
import { Event } from "../../objects/types";

export async function findEventsByTargetId(
    context: Context,
    id: string,
): Promise<Event[]> {

    const eventsDb = await context.clientDatabaseApi.queries.findEventsByTargetId(id);
    return eventsDb.map(eventDb => Event.builderFromDb(eventDb.get()));

}
