import {
    Resolver, Query, Ctx, Arg, Mutation, Publisher, Subscription, Args, Root, PubSub, ResolverFilterData,
} from "type-graphql";
import {
    viewerEventEventsQuery, viewerEventEventssQuery, createViewerEventEventsQuery,
    updateViewerEventEventsQuery,
    deleteViewerEventEventsQuery, deleteViewerEventEventssQuery,
} from "../query/viewerEventEvents";
import { ViewerEventEvents } from "../objects/types";
import { Context } from "@umk-stat/statistic-server-core";
import { Topics } from "../objects";
import {
    Event, Viewer, EventSubscriptionArgs, TargetExecutionCountSubscriptionArgs,
    ViewerSubscriptionArgs,
} from "../objects"
  
@Resolver()
export class ViewerEventEventsResolver {

    @Mutation(() => ViewerEventEvents, {
        nullable: false,
    })
    public async createViewerEventEvents(
        @Ctx()
        context: Context,
        @Arg("eventID", {
            nullable: false,
        })
        eventID: string,
        @Arg("viewerID", {
            nullable: false,
        })
        viewerID: string,
        @Arg("time", {
            nullable: true,
        })
        time: Date,
    ): Promise<ViewerEventEvents> {

        return await createViewerEventEventsQuery(context, eventID, viewerID, time);

    }

    @Query(() => ViewerEventEvents, {
        nullable: true,
    })
    public async viewerEventEvents(
        @Ctx()
        context: Context,

        @Arg("id", {
            nullable: false,
        })
        id: string,
    ): Promise<ViewerEventEvents | null> {

        return viewerEventEventsQuery(context, id);

    }

    @Query(() => [ViewerEventEvents], {
        nullable: false,
    })
    public async viewerEventEventss(
        @Ctx()
        context: Context,
    ): Promise<ViewerEventEvents[]> {

        return viewerEventEventssQuery(context);

    }

    @Mutation(() => ViewerEventEvents, {
        nullable: false,
    })
    public async updateViewerEventEvents(
        @Ctx()
        context: Context,

        @Arg("id", {
            nullable: false,
        })
        id: string,

        @Arg("viewerID", {
            nullable: true,
        })
        viewerID: string,

        @Arg("eventID", {
            nullable: true,
        })
        eventID: string,
        @Arg("time", {
            nullable: true,
        })
        time: Date
    ): Promise<ViewerEventEvents | null> {

        return updateViewerEventEventsQuery(context, id, viewerID, eventID, time);

    }

    @Mutation(() => ViewerEventEvents, {
        nullable: false,
    })

    @Mutation(() => ViewerEventEvents, {
        nullable: false,
    })
    public async deleteViewerEventEvents(
        @Ctx()
        context: Context,

        @Arg("id", {
            nullable: false,
        })
        id: string,
    ): Promise<ViewerEventEvents | null> {

        return deleteViewerEventEventsQuery(context, id);

    }

    @Mutation(() => [ViewerEventEvents], {
        nullable: false,
    })
    public async deleteViewerEventEventss(
        @Ctx()
        context: Context,
    ): Promise<ViewerEventEvents[]> {

        return deleteViewerEventEventssQuery(context);

    }

    @Mutation(() => ViewerEventEvents, {
        nullable: true,
    })
    public async postViewerEvent(
        @Ctx()
        context: Context,
        @Arg("eventName", {
            nullable: false,
        })
        eventName: string,
        @Arg("identifier", {
            nullable: false,
        })
        identifier: string,
        @Arg("compInfo", {
            nullable: false,
        })
        compInfo: string,
        @Arg("userInfo", {
            nullable: false,
        })
        userInfo: string,

        @PubSub(Topics.Event)
        publishEvent: Publisher<ViewerEventEvents>,

        @PubSub(Topics.TargetExecutionCount)
        publishTargetExecutionCount: Publisher<ViewerEventEvents>,

        @PubSub(Topics.Viewer)
        publishViewer: Publisher<ViewerEventEvents>,

        @PubSub(Topics.ViewerGraphics)
        publishGraphicsViewer: Publisher<Viewer>,
    ): Promise<ViewerEventEvents> {
        console.log('resolver');

        const queryresult = await context.clientDatabaseApi.queries.postViewerEvent(eventName, identifier, compInfo, userInfo);
        const viewerDatabase = await context.clientDatabaseApi.queries.findViewer(queryresult.viewerID);
        const viewer = viewerDatabase == null ? null : Viewer.builderFromDb(viewerDatabase.get())
        const publishResult = ViewerEventEvents.builderFromDb(queryresult.get())

        await publishEvent(publishResult);
        await publishViewer(publishResult);
        await publishTargetExecutionCount(publishResult);

        if (viewer) {
            console.log(viewer);
            await publishGraphicsViewer(viewer);
        }
        return ViewerEventEvents.builderFromDb(queryresult.get());
    }

    @Subscription(() => ViewerEventEvents, {
        topics: Topics.Event,
    })
    public async eventSubscription(
        @Args(() => EventSubscriptionArgs)
        __: EventSubscriptionArgs,
        @Root()
        root: ViewerEventEvents,

    ): Promise<ViewerEventEvents> {
        return root;
    }

    @Subscription(() => ViewerEventEvents, {
        topics: Topics.TargetExecutionCount,
    })
    public async targetExecutionCountSubscription(
        @Args(() => TargetExecutionCountSubscriptionArgs)
        __: TargetExecutionCountSubscriptionArgs,
        @Root()
        root: ViewerEventEvents,

    ): Promise<ViewerEventEvents> {
        return root;
    }

    @Subscription(() => ViewerEventEvents, {
        topics: Topics.Viewer,
    })
    public async viewerSubscription(
        @Args(() => ViewerSubscriptionArgs)
        __: ViewerSubscriptionArgs,
        @Root()
        root: ViewerEventEvents,

    ): Promise<ViewerEventEvents> {
        return root;
    }

    
    @Subscription(() => Viewer, {
        topics: Topics.ViewerGraphics,
    })
    public async viewergraphicsSubscription(
        @Root()
        root: Viewer,

    ): Promise<Viewer> {
        return root;
    }

}
