import DataLoader from "dataloader";
import { MiddlewareFn } from "type-graphql";
import { Context } from "@umk-stat/statistic-server-core";
import { Viewer } from "../objects/types";
import { setLoaderToContext } from "@umk-stat/statistic-server-core";
import { viewerEventEventsQuery } from "../query";

export const viewerViewerEventEventsLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "viewerViewerEventEventsLoader";

    const batchFn: (ids: string[]) => Promise<(Viewer | null)[]> =  async (ids: string[])
        : Promise<(Viewer | null)[]> => {
        const viewerEventEvents = await Promise.all(ids.map(async id => await context.clientDatabaseApi.queries.findViewerEventEvents(id)));
        const viewerIds = viewerEventEvents.map(vee => vee?.viewerID);
        const viewerDatabases = await Promise.all(viewerIds.map(async viewerId => viewerId ? await context.clientDatabaseApi.queries.findViewer(viewerId) : null));
        return await Promise.all(viewerDatabases.map(viewer => viewer === null ? null : Viewer.builderFromDb(viewer.get())));
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
