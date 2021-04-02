import { ViewerEventEventsAttributes } from "@umk-stat/statistic-server-client-database";
import {
    Ctx, Field, ObjectType, Root, UseMiddleware,
} from "type-graphql";
import { Node } from "@umk-stat/statistic-server-core";
import { Context } from "@umk-stat/statistic-server-core";
import { getHashArgs } from "@umk-stat/statistic-server-core";
import { eventViewerEventEventsLoaderInit } from "../../middleware";
import { viewerViewerEventEventsLoaderInit } from "../../middleware";
import { viewerQuery, eventQuery } from "../../query";
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
        viewerEventEvents.time = object.time;
        viewerEventEvents.eventID = object.eventID;
        viewerEventEvents.viewerID = object.viewerID;
        return viewerEventEvents;

    }

    public id: string

    @Field(() => Date, {
        nullable: false,
    })
    public time: Date

    @Field(() => String, {
        nullable: false,
    })
    private eventID: string

    @Field(() => String, {
        nullable: false,
    })
    private viewerID: string

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

        if (!context.dataLoadersMap) {
            const event = await eventQuery(context, this.eventID);
            if (event) return event;
        }
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

        if (!context.dataLoadersMap) {
            const viewer = await viewerQuery(context, this.viewerID);
            if (viewer) return viewer;
        }
        const eventType = "viewerViewerEventEventsLoader";
        const hash = getHashArgs([]);
        return await context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);
    }

}
