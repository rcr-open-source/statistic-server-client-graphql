import {
    Resolver, Query, Ctx, Arg, Mutation,
} from "type-graphql";
import {
    viewerEventEventsQuery, viewerEventEventssQuery, createViewerEventEventsQuery,
    updateViewerEventEventsQuery, postEvent,
    deleteViewerEventEventsQuery, deleteViewerEventEventssQuery,
} from "../query/viewerEventEvents";
import { ViewerEventEvents } from "../objects/types";
import { Context } from "@umk-stat/statistic-server-core";

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

        return createViewerEventEventsQuery(context, eventID, viewerID, time);

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

    @Query(() => ViewerEventEvents, {
        nullable: true,
    })
    public async postEvent(
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
    ): Promise<ViewerEventEvents | null> {

        return postEvent(context, eventName, identifier, compInfo, userInfo);

    }

}
