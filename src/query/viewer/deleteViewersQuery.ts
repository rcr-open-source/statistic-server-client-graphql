import { Context } from "@umk-stat/statistic-server-core";
import { Viewer } from "../../objects/types";

export async function deleteViewersQuery(
    context: Context
): Promise<Viewer[]> {

    const viewersDb = await context.clientDatabaseApi.queries.deleteViewers();
    return viewersDb.map((viewerDb) => Viewer.builderFromDb(viewerDb.get()));

}
