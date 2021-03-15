import { ViewerTargetTargetsAttributes } from "@umk-stat/statistic-server-client-database";
import {
    Ctx, Field, ObjectType, Root, UseMiddleware,
} from "type-graphql";
import { Node } from "@umk-stat/statistic-server-core";
import { Context } from "@umk-stat/statistic-server-core";
import { getHashArgs } from "@umk-stat/statistic-server-core";
import { targetViewerTargetTargetsLoaderInit } from "../../middleware";
import { viewerViewerTargetTargetsLoaderInit } from "../../middleware";
import { Target } from "./Target";
import { Viewer } from "./Viewer";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class ViewerTargetTargets implements Node {

    public static builderFromDb(object: ViewerTargetTargetsAttributes): ViewerTargetTargets {

        const viewerTargetTargets = new ViewerTargetTargets();
        viewerTargetTargets.id = object.id;
        return viewerTargetTargets;

    }

    public id: string

    @UseMiddleware(targetViewerTargetTargetsLoaderInit)
    @Field(() => Target, {
        nullable: false,
    })
    public async target(

        @Ctx()
            context: Context,
        @Root()
            { id }: ViewerTargetTargets,


    ): Promise<Target> {

        const eventType = "targetViewerTargetTargetsLoader";
        const hash = getHashArgs([]);

        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }

    @UseMiddleware(viewerViewerTargetTargetsLoaderInit)
    @Field(() => Viewer, {
        nullable: false,
    })
    public async viewer(

        @Ctx()
            context: Context,
        @Root()
            { id }: ViewerTargetTargets,

    ): Promise<Viewer> {

        const eventType = "viewerViewerTargetTargetsLoader";
        const hash = getHashArgs([]);

        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }

}
