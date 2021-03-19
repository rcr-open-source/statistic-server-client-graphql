import { TargetAttributes } from "@umk-stat/statistic-server-client-database";
import {
    Ctx, Field, ObjectType, Root, UseMiddleware,
} from "type-graphql";
import { eventsTargetDataLoaderInit } from "../../middleware";
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

    ): Promise<Event> {

        const eventType = "eventsTargetDataLoader";
        const hash = getHashArgs([]);

        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }

}
