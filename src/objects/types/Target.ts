import { TargetAttributes } from "@umk-stat/statistic-server-client-database";
import { Field, ObjectType,} from "type-graphql";
import { Node } from "@umk-stat/statistic-server-core";

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

}
