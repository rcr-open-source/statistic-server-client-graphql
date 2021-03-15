import DataLoader from "dataloader";
import { MiddlewareFn } from "type-graphql";
import { Context } from "@umk-stat/statistic-server-core";
import { Viewer } from "../objects/types";
import { setLoaderToContext } from "@umk-stat/statistic-server-core";
import { viewerQuery } from "../query";

export const viewerViewerTargetTargetsLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "viewerViewerTargetTargetsLoader";

    const batchFn: (ids: string[]) => Promise<(Viewer | null)[]> =  async (ids: string[])
        : Promise<(Viewer | null)[]> => {
        const viewerTargetTargets = await Promise.all(ids.map(id => context.databaseApi.queries.findViewerTargetTargets(id)));
        const viewerIds = viewerTargetTargets.map(vtt => vtt?.viewerID);
        return Promise.all(viewerIds.map(viewerId => viewerId ? viewerQuery(context, viewerId) : null));
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
