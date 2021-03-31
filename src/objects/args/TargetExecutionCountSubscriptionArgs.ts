import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class TargetExecutionCountSubscriptionArgs {

  @Field(() => String, {
    nullable: false,
  })
  systemID: string;

}
