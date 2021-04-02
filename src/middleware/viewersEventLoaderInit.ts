import DataLoader from "dataloader";
import { MiddlewareFn } from "type-graphql";
import { Context } from "@umk-stat/statistic-server-core";
import { setLoaderToContext } from "@umk-stat/statistic-server-core";
import { findViewerEventEventsByEventId } from "../query";

export const viewersEventLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "viewersEventLoader";

    const batchFn: (ids: string[]) => Promise<string[][]> =  async (ids: string[])
        : Promise<string[][]> => {
            const viewerIds = ids.map(id => context.clientDatabaseApi.queries.findViewerIdsByEventId(id));
            return await Promise.all(viewerIds);
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
