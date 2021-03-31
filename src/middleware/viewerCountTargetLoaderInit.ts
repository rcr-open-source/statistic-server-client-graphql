import DataLoader from "dataloader";
import { MiddlewareFn } from "type-graphql";
import { Context } from "@umk-stat/statistic-server-core";
import { setLoaderToContext } from "@umk-stat/statistic-server-core";
import { findEventsByTargetId, findViewerEventEventsByEventId } from "../query";

export const viewerCountTargetLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "viewerCountTargetLoader";

    const batchFn: (ids: string[]) => Promise<number[]> =  async (ids: string[])
        : Promise<number[]> => {
            const eventsArr = await Promise.all(ids.map(id => findEventsByTargetId(context, id)));
            const counts = await Promise.all(eventsArr.map(
                async events => {
                    const veeArrays = await Promise.all(events.map(event => context.clientDatabaseApi.queries.findViewerEventEventsByEventId(event.id)));
                    const executionCounts =  veeArrays.map(vee => vee.length);
                    const executionCount = executionCounts.length ? Math.min(...executionCounts) : 0;
                    if (executionCount > 0) {
                        const viewers = new Set();
                        veeArrays.forEach(vees => vees.forEach(vee => viewers.add(vee.viewerID)));
                        return Array.from(viewers).length;
                    }
                    return 0;
                }
            ));
            return counts;
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
