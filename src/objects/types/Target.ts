import { TargetAttributes } from "@umk-stat/statistic-server-client-database";
import {
    Ctx, Field, ObjectType, Root, UseMiddleware,
    Args, Arg,
} from "type-graphql";
import { eventsTargetDataLoaderInit, executionCountTargetLoaderInit, viewerCountTargetLoaderInit } from "../../middleware";
import { Context } from "@umk-stat/statistic-server-core";
import { getHashArgs } from "@umk-stat/statistic-server-core";
import { Node } from "@umk-stat/statistic-server-core";
import { Event } from "./Event";


@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class Target implements Node {


    public static builderFromDb(object: TargetAttributes): Target {

        const target = new Target();
        target.id = object.id;
        target.name = object.name;
        target.systemID = object.systemID;
        return target;

    }

    public id: string

    @Field(() => String, {
        nullable: false,
    })
    public name: string

    @Field(() => String, {
        nullable: false,
    })
    systemID: string;

    @UseMiddleware(eventsTargetDataLoaderInit)
    @Field(() => [Event], {
        nullable: false,
    })
    public async events(

        @Ctx()
            context: Context,
        @Root()
            { id }: Event,

    ): Promise<Event[]> {

        const eventType = "eventsTargetDataLoader";
        const hash = getHashArgs([]);

        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }

    // @UseMiddleware(viewerEventEventsTargetDataLoaderInit)
    // @Field(() => [ViewerEventEvents], {
    //     nullable: false,
    // })
    // public async viewerEventEvents(

    //     @Ctx()
    //         context: Context,
    //     @Root()
    //         { id }: Event,

    // ): Promise<ViewerEventEvents[]> {

    //     const eventType = "viewerEventEventsTargetDataLoader";
    //     const hash = getHashArgs([]);
    //     const dataloaderResult = await context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);
    //     const result = dataloaderResult.reduce((current, result) => {
    //         result = result.concat(current);
    //         return result;
    //     }, []);
    //     return result;

    // }

    @UseMiddleware(executionCountTargetLoaderInit)
    @Field(() => Number, {
        nullable: false,
    })
    public async executionCount(

        @Ctx()
        context: Context,

        @Root()
            { id }: Target,

    ): Promise<number> {

        const edgeType = "executionCountTargetLoader";
        const hash = getHashArgs([]);
        return context.dataLoadersMap.get(edgeType)?.get(hash)?.load(id);;
    }

    @UseMiddleware(viewerCountTargetLoaderInit)
    @Field(() => Number, {
        nullable: false,
    })
    public async viewerCount(

        @Ctx()
        context: Context,

        @Root()
            { id }: Target,

    ): Promise<number> {

        const edgeType = "viewerCountTargetLoader";
        const hash = getHashArgs([]);
        return context.dataLoadersMap.get(edgeType)?.get(hash)?.load(id);;
    }
}
