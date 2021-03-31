import DataLoader from "dataloader";
import { MiddlewareFn } from "type-graphql";
import { Context } from "@umk-stat/statistic-server-core";
import { setLoaderToContext } from "@umk-stat/statistic-server-core";
import { findViewerEventEventsByEventId } from "../query";

export const executionCountLoaderInit: MiddlewareFn<Context> = (
  { context, args },
  next
) => {

  const middlewareType = "executionCountLoader";

  const batchFn: (ids: string[]) => Promise<number[]> = async (ids: string[])
    : Promise<number[]> => {
    const vees = await Promise.all(ids.map(id => findViewerEventEventsByEventId(context, id)));
    return vees.map(vee => vee.length);
  };

  const newLoader = new DataLoader(batchFn);

  setLoaderToContext(args, middlewareType, newLoader, context);

  return next();

}
