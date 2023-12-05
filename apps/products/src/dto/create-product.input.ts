import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('CreateProductInput')
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;
}
