import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Cart } from './cart.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => Cart)
  cart?: Cart;
}
