import {
    Resolver, Query, Ctx, Arg, Mutation, Publisher, Subscription, Args, Root, PubSub,
} from "type-graphql";
import {
    eventQuery, eventsQuery, createEventQuery,
    updateEventQuery, findEventByName,
    deleteEventQuery, deleteEventsQuery,
} from "../query/event";
import { Event, ViewerEventEvents } from "../objects/types";
import { Context } from "@umk-stat/statistic-server-core";
import { Topics } from "../objects";
import { EventSubscriptionArgs, TargetExecutionCountSubscriptionArgs } from "../objects"

@Resolver()
export class EventResolver {

    @Mutation(() => Event, {
        nullable: false,
    })
    public async createEvent(
        @Ctx()
            context: Context,
        @Arg("name", {
            nullable: false,
        })
            name: string,
        @Arg("targetID", {
            nullable: false,
        })
            targetID: string,
    ): Promise<Event> {

        return createEventQuery(context, name, targetID);

    }

    @Query(() => Event, {
        nullable: true,
    })
    public async event(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<Event | null> {

        return eventQuery(context, id);

    }

    @Query(() => [Event], {
        nullable: false,
    })
    public async events(
        @Ctx()
            context: Context,
    ): Promise<Event[]> {

        return eventsQuery(context);

    }

    @Mutation(() => Event, {
        nullable: false,
    })
    public async updateEvent(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,

        @Arg("name", {
            nullable: false,
        })
            name: string,
        @Arg("targetID", {
            nullable: true,
        })
            targetID: string,
    ): Promise<Event | null> {

        return updateEventQuery(context, id, name, targetID);

    }

    @Mutation(() => Event, {
        nullable: false,
    })
    public async deleteEvent(
        @Ctx()
            context: Context,

        @Arg("id", {
            nullable: false,
        })
            id: string,
    ): Promise<Event | null> {

        return deleteEventQuery(context, id);

    }

    @Mutation(() => [Event], {
        nullable: false,
    })
    public async deleteEvents(
        @Ctx()
            context: Context,
    ): Promise<Event[]> {

        return deleteEventsQuery(context);

    }

    @Query(() => Event, {
        nullable: false,
    })
    public async findEventByName(
        @Ctx()
            context: Context,
        @Arg("name", {
            nullable: false,
        })
            name: string,   
    ): Promise<Event | null> {

        return findEventByName(context, name);

    }

    @Mutation(() => Event, {
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
        publishEvent: Publisher<Event>,

        @PubSub(Topics.TargetExecutionCount)
        publishTargetExecutionCount: Publisher<Event>,
    ): Promise<Event | null> {

        const queryresult = await context.clientDatabaseApi.queries.postViewerEvent(eventName, identifier, compInfo, userInfo);
        if (queryresult) {
            const publishResult = Event.builderFromDb(queryresult.get());
            const viewerEventEvents = context.clientDatabaseApi.queries.findViewerEventEventsByEventId(queryresult.id);
            await publishEvent(publishResult);
            await publishTargetExecutionCount(publishResult);
            return publishResult;
        }
        return null;
    }

    @Subscription(() => Event, {
        topics: Topics.Event,
    })
    public async eventSubscription(
        @Args(() => EventSubscriptionArgs)
        args: EventSubscriptionArgs,
        @Root()
        root: Event,

    ): Promise<Event> {
        return root;
    }

    @Subscription(() => Event, {
        topics: Topics.TargetExecutionCount,
    })
    public async targetExecutionCountSubscription(
        @Args(() => TargetExecutionCountSubscriptionArgs)
        args: TargetExecutionCountSubscriptionArgs,
        @Root()
        root: Event,

    ): Promise<Event> {
        return root;
    }

}
