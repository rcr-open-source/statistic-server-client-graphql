import { Context } from "@umk-stat/statistic-server-core";
import { Event } from "../../objects/types";

export async function updateEventQuery(
    context: Context,
    id: string,
    name?: string,
    targetID?: string,
): Promise<null | Event> {

    const eventDb = await context.clientDatabaseApi.queries.updateEvent(id, name, targetID);
    return eventDb === null ? null : Event.builderFromDb(eventDb.get());

}

