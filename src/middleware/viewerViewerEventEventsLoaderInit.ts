import DataLoader from "dataloader";
import { MiddlewareFn } from "type-graphql";
import { Context } from "@umk-stat/statistic-server-core";
import { Viewer } from "../objects/types";
import { setLoaderToContext } from "@umk-stat/statistic-server-core";
import { viewerQuery } from "../query";

export const viewerViewerEventEventsLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "viewerViewerEventEventsLoader";

    const batchFn: (ids: string[]) => Promise<(Viewer | null)[]> =  async (ids: string[])
        : Promise<(Viewer | null)[]> => {
        const viewerEventEvents = await Promise.all(ids.map(id => context.clientDatabaseApi.queries.findViewerEventEvents(id)));
        const viewerIds = viewerEventEvents.map(vee => vee?.viewerID);
        return Promise.all(viewerIds.map(viewerId => viewerId ? viewerQuery(context, viewerId) : null));
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
