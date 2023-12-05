import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'apps/account/src/apps/user/entities/user.entity';
import { Cart } from 'apps/cart/src/entities/cart.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@shareable')
export class Order {
  @Field(() => ID)
  id: number;

  @Field()
  orderStatus: boolean;

  @Field()
  totalAmount: number;

  @Field(() => User)
  user: User;

  @Field(() => Cart)
  Cart?: Cart;
}
