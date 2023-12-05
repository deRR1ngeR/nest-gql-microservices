import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Cart } from 'apps/cart/src/entities/cart.entity';
import { Order } from 'apps/order/src/entities/order.entity';

export enum Role {
  User = 'USER',
  Guest = 'GUEST',
  Admin = 'ADMIN',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User roles: [admin, user, guest]',
});

@ObjectType()
@Directive('@shareable')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  customerId?: string;

  @Field()
  role: Role;

  @Field(() => [Order], { nullable: true })
  orders?: Order[];

  @Field(() => Cart, { nullable: true })
  cart?: Cart;
}
