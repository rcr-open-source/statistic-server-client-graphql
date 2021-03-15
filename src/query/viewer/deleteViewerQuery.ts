import { Context } from "@umk-stat/statistic-server-core";
import { Viewer } from "../../objects/types";

export async function deleteViewerQuery(
    context: Context,
    id: string,
): Promise<Viewer | null> {

    const viewerDb = await context.databaseApi.queries.deleteViewer(id);
    return viewerDb === null ? null : Viewer.builderFromDb(viewerDb.get());
}
