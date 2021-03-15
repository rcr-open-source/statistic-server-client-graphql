import {MiddlewareFn} from "type-graphql";
import DataLoader from "dataloader";
import {Context} from "@umk-stat/statistic-server-core";
import {setLoaderToContext} from "@umk-stat/statistic-server-core";
import {System, systemQuery} from "@umk-stat/statistic-server-system-graphql";

export const systemTargetLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "systemTargetLoader";

    const batchFn: (ids: string[]) => Promise<(System | null)[]> =  async (ids: string[])
        : Promise<(System | null)[]> => {
        const targets = await Promise.all(ids.map(id => context.databaseApi.queries.findTarget(id)));
        const systemIds = targets.map(target => target?.systemID);
        return Promise.all(systemIds.map(systemId => systemId? systemQuery(context, systemId) : null));
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
