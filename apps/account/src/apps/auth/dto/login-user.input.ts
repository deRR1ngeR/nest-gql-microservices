import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('LoginUserInput')
export class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
