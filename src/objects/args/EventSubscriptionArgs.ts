import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class EventSubscriptionArgs {

  @Field(() => String, {
    nullable: false,
  })
  targetID: string;

}
