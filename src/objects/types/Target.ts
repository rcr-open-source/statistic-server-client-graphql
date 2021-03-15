import { TargetAttributes } from "@umk-stat/statistic-server-client-database";
import {Ctx, Field, ObjectType, Root, UseMiddleware} from "type-graphql";
import { Node } from "@umk-stat/statistic-server-core";
import {Context} from "@umk-stat/statistic-server-core";
import {getHashArgs} from "@umk-stat/statistic-server-core";
import {System} from "@umk-stat/statistic-server-system-graphql";
import {systemTargetLoaderInit} from "../../middleware";

@ObjectType({
    implements: Node,
    simpleResolvers: true,
})
export class Target implements Node {


    public static builderFromDb(object: TargetAttributes): Target {

        const target = new Target();
        target.id = object.id;
        target.name = object.name;
        return target;

    }

    public id: string

    @Field(() => String, {
        nullable: false,
    })
    public name: string

    @UseMiddleware(systemTargetLoaderInit)
    @Field(() => System, {
        nullable: false,
    })
    public async system(

        @Ctx()
            context: Context,
        @Root()
            { id }: Target

    ): Promise<System> {

        const eventType = "systemTargetLoader";
        const hash = getHashArgs([]);
        return context.dataLoadersMap.get(eventType)?.get(hash)?.load(id);

    }
}
