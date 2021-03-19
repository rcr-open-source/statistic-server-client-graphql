import {MiddlewareFn} from "type-graphql";
import DataLoader from "dataloader";
import {Context} from "@umk-stat/statistic-server-core";
import {setLoaderToContext} from "@umk-stat/statistic-server-core";
import { Event } from "../objects/types";
import { findEventsByTargetId } from "../query";

export const eventsTargetDataLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next
) => {

    const middlewareType = "eventsTargetDataLoader";

    const batchFn: (ids: string[]) => Promise<Event[][]> =  async (ids: string[])
        : Promise<Event[][]> => {
        const events = await Promise.all(ids.map(id => findEventsByTargetId(context, id)));
        return events;
    };

    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    return next();

}
