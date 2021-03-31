import "reflect-metadata";
import { registerEnumType, EnumResolver} from "type-graphql";

export enum Topics {

    Event = "EVENT", 
    TargetExecutionCount = "TARGET_EXECUTION_COUNT", 

}

registerEnumType(Topics, {
    name: "Topics",
});
