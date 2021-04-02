import DataLoader from "dataloader";
import { MiddlewareFn } from "type-graphql";
import { Context } from "@umk-stat/statistic-server-core";
import { setLoaderToContext } from "@umk-stat/statistic-server-core";
import { findEventsByTargetId, findViewerEventEventsByEventId } from "../query";

export const viewersTargetLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "viewersTargetLoader";

    const batchFn: (ids: string[]) => Promise<string[][]> =  async (ids: string[])
        : Promise<string[][]> => {
            const eventsArr = await Promise.all(ids.map(id => findEventsByTargetId(context, id)));
            const viewerIds = await Promise.all(eventsArr.map(
                async events => {
                    const viewerIdsArray = await Promise.all(events.map(
                        async event => await context.clientDatabaseApi.queries.findViewerIdsByEventId(event.id)
                    ));
                    if (!viewerIdsArray.length) return [];
                    let result = new Set(viewerIdsArray[0]);
                    viewerIdsArray.forEach(viewerIds => {
                        result = new Set([...result].filter(x => new Set(viewerIds).has(x)));
                    });
                    return Array.from(result);
                }
            ));
            return viewerIds;
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
