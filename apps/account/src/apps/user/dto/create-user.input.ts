import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('CreateUserInput')
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}
