import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('CreatCartInput')
@InputType('CreateCartInput')
export class CreateCartInput {
  @Field()
  userId: number;
}
