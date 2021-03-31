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

    const batchFn: (ids: string[]) => Promise<number[]> =  async (ids: string[])
        : Promise<number[]> => {
            const eventsArr = await Promise.all(ids.map(id => findEventsByTargetId(context, id)));
            const counts = await Promise.all(eventsArr.map(
                async events => {
                    const vees = await Promise.all(events.map(event => findViewerEventEventsByEventId(context, event.id)));
                    const executionCounts =  vees.map(vee => vee.length);
                    return executionCounts.length ? Math.min(...executionCounts) : 0;
                }
            ));
            return counts;
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
