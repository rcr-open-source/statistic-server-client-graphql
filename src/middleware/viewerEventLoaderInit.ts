import {MiddlewareFn} from "type-graphql";
import DataLoader from "dataloader";
import {Context} from "@umk-stat/statistic-server-core";
import {setLoaderToContext} from "@umk-stat/statistic-server-core";
import {Viewer} from "../objects/types";
import {viewerQuery} from "../query";

export const viewerEventLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "viewerEventLoader";

    const batchFn: (ids: string[]) => Promise<(Viewer | null)[]> =  async (ids: string[])
        : Promise<(Viewer | null)[]> => {
            const events = await Promise.all(ids.map(id => context.databaseApi.queries.findEvent(id)));
            const viewerIds = events.map(event => event?.viewerID);
            return Promise.all(viewerIds.map(viewerId => viewerId ? viewerQuery(context, viewerId) : null));
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
