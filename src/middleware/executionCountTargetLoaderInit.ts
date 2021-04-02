import DataLoader from "dataloader";
import { MiddlewareFn } from "type-graphql";
import { Context } from "@umk-stat/statistic-server-core";
import { setLoaderToContext } from "@umk-stat/statistic-server-core";
import { findEventsByTargetId, findViewerEventEventsByEventId } from "../query";

export const executionCountTargetLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "executionCountTargetLoader";

    const batchFn: (ids: string[]) => Promise<number[]> = async (ids: string[])
        : Promise<number[]> => {
        const eventsArr = await Promise.all(ids.map(id => findEventsByTargetId(context, id)));
        const viewerCounts = await Promise.all(eventsArr.map(
            async events => {
                const viewerIdsArray = await Promise.all(events.map(
                    async event => await context.clientDatabaseApi.queries.findViewerIdsByEventId(event.id)
                ));
                if (!viewerIdsArray.length) return 0;
                let targetViewersSet = new Set(viewerIdsArray[0]);
                viewerIdsArray.forEach(viewerIds => {
                    targetViewersSet = new Set([...targetViewersSet].filter(x => new Set(viewerIds).has(x)));
                });
                const targetViewersArray = Array.from(targetViewersSet);
                let result = 0;
                targetViewersArray.forEach(targetViewer => {
                    let counter = Infinity;
                    viewerIdsArray.forEach(eventViewers => {
                        counter = Math.min(counter, eventViewers.filter((id) => id === targetViewer).length);
                    });
                    if (counter === Infinity) counter = 0;
                    result += counter;
                })
                return result;
            }
        ));
        console.info(viewerCounts);
        return viewerCounts;
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
