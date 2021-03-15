import {MiddlewareFn} from "type-graphql";
import DataLoader from "dataloader";
import {Context} from "@umk-stat/statistic-server-core";
import {setLoaderToContext} from "@umk-stat/statistic-server-core";
import {Target} from "../objects/types";
import {targetQuery} from "../query";

export const targetEventLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "targetEventLoader";

    const batchFn: (ids: string[]) => Promise<(Target | null)[]> =  async (ids: string[])
        : Promise<(Target | null)[]> => {
        const events = await Promise.all(ids.map(id => context.databaseApi.queries.findEvent(id)));
        const targetIds = events.map(event => event?.targetID);
        return Promise.all(targetIds.map(targetId => targetId ? targetQuery(context, targetId) : null));
    };


    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
