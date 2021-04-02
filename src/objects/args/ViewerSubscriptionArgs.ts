import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class ViewerSubscriptionArgs {

  @Field(() => String, {
    nullable: false,
  })
  systemID: string;

}
