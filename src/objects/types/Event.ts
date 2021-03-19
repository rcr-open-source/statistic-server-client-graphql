import { EventAttributes } from "@umk-stat/statistic-server-client-database";
import {
    Ctx, Field, ObjectType, Root, UseMiddleware
} from "type-graphql";
import { Node } from "@umk-stat/statistic-server-core";
import { Context } from "@umk-stat/statistic-server-core";
import { getHashArgs } from "@umk-stat/statistic-server-core";
import { targetEventLoaderInit } from "../../middleware";
import { Target } from "./Target";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class Event implements Node {

    public static builderFromDb(object: EventAttributes): Event {

        const event = new Event();
        event.id = object.id;
        event.name = object.name;
        return event;

    }

    public id: string

    @Field(() => String, {
        nullable: false,
    })
    public name: string

    @UseMiddleware(targetEventLoaderInit)
    @Field(() => Target, {
        nullable: false,
    })
    public async target(

        @Ctx()
            context: Context,
        @Root()
            { id }: Event,

    ): Promise<Target> {

        const eventType = "targetEventLoader";
        const hash = getHashArgs([]);
        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);
    
    }

}
