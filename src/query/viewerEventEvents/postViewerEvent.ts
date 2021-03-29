import { Context } from "@umk-stat/statistic-server-core";
import { ViewerEventEvents } from "../../objects/types";

export async function postViewerEvent(
  context: Context,
  eventName: string,
  identifier: string,
  compInfo: string,
  userInfo: string,
): Promise<ViewerEventEvents | null> {

  const vee = await context.clientDatabaseApi.queries.postViewerEvent(
    eventName,
    identifier,
    compInfo,
    userInfo,
  );
  
  return vee === null ? null : ViewerEventEvents.builderFromDb(vee);
}
