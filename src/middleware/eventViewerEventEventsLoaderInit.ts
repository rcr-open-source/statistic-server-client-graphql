import DataLoader from "dataloader";
import { MiddlewareFn } from "type-graphql";
import { Context } from "@umk-stat/statistic-server-core";
import { setLoaderToContext } from "@umk-stat/statistic-server-core";
import { Event } from "../objects/types";
import { eventQuery, viewerEventEventsQuery } from "../query";

export const eventViewerEventEventsLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "eventViewerEventEventsLoader";

    const batchFn: (ids: string[]) => Promise<(Event | null)[]> =  async (ids: string[])
        : Promise<(Event | null)[]> => {
            const viewerEventEvents = await Promise.all(ids.map(id => context.clientDatabaseApi.queries.findViewerEventEvents(id)));
            const eventIds = viewerEventEvents.map(vee => vee?.eventID);
            return Promise.all(eventIds.map(eventId => eventId ? eventQuery(context, eventId) : null));
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
