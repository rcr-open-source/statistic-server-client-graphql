import {MiddlewareFn} from "type-graphql";
import DataLoader from "dataloader";
import {Context} from "@umk-stat/statistic-server-core";
import {setLoaderToContext} from "@umk-stat/statistic-server-core";
import { ViewerEventEvents } from "../objects/types";
import { findEventsByTargetId, findViewerEventEventsByEventId } from "../query";

export const viewerEventEventsTargetDataLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "viewerEventEventsTargetDataLoader";

    const batchFn: (ids: string[]) => Promise<ViewerEventEvents[][][]> =  async (ids: string[])
        : Promise<ViewerEventEvents[][][]> => {
        const eventsarr = await Promise.all(ids.map(id => findEventsByTargetId(context, id)));
        const vees =  await Promise.all(eventsarr.map(async events => await Promise.all(events.map(event => findViewerEventEventsByEventId(context, event.id)))));
        return vees;
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
