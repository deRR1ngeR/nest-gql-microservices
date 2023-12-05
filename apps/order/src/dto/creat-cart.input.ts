import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('CreateCartInput')
@InputType('CreateCartInput')
export class createCartInput {
  @Field()
  orderStatus: boolean;

  @Field()
  totalAmount: number;
}
