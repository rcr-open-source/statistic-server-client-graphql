import { ViewerEventEventsAttributes } from "@umk-stat/statistic-server-client-database";
import {
    Ctx, Field, ObjectType, Root, UseMiddleware,
} from "type-graphql";
import { Node } from "@umk-stat/statistic-server-core";
import { Context } from "@umk-stat/statistic-server-core";
import { getHashArgs } from "@umk-stat/statistic-server-core";
import { eventViewerEventEventsLoaderInit } from "../../middleware";
import { viewerViewerEventEventsLoaderInit } from "../../middleware";
import { Event } from "./Event";
import { Viewer } from "./Viewer";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class ViewerEventEvents implements Node {

    public static builderFromDb(object: ViewerEventEventsAttributes): ViewerEventEvents {

        const viewerEventEvents = new ViewerEventEvents();
        viewerEventEvents.id = object.id;
        return viewerEventEvents;

    }

    public id: string

    @UseMiddleware(eventViewerEventEventsLoaderInit)
    @Field(() => Event, {
        nullable: false,
    })
    public async event(

        @Ctx()
            context: Context,
        @Root()
            { id }: ViewerEventEvents,


    ): Promise<Event> {

        const eventType = "eventViewerEventEventsLoader";
        const hash = getHashArgs([]);

        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }

    @UseMiddleware(viewerViewerEventEventsLoaderInit)
    @Field(() => Viewer, {
        nullable: false,
    })
    public async viewer(

        @Ctx()
            context: Context,
        @Root()
            { id }: ViewerEventEvents,

    ): Promise<Viewer> {

        const eventType = "viewerViewerEventEventsLoader";
        const hash = getHashArgs([]);

        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }

}
