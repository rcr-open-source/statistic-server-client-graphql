import DataLoader from "dataloader";
import { MiddlewareFn } from "type-graphql";
import { Context } from "@umk-stat/statistic-server-core";
import { setLoaderToContext } from "@umk-stat/statistic-server-core";
import { Target } from "../objects/types";
import { targetQuery } from "../query";

export const targetViewerTargetTargetsLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "targetViewerTargetTargetsLoader";

    const batchFn: (ids: string[]) => Promise<(Target | null)[]> =  async (ids: string[])
        : Promise<(Target | null)[]> => {
            const viewerTargetTargets = await Promise.all(ids.map(id => context.databaseApi.queries.findViewerTargetTargets(id)));
            const targetIds = viewerTargetTargets.map(vtt => vtt?.targetID);
            return Promise.all(targetIds.map(targetId => targetId ? targetQuery(context, targetId) : null));
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
