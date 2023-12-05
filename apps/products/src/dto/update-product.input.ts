import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('UpdateProductInput')
export class UpdateProductInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  price: number;
}
