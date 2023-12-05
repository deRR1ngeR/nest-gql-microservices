import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'apps/account/src/apps/user/entities/user.entity';
import { Product } from 'apps/products/src/entities/product.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@shareable')
export class Cart {
  @Field(() => ID)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => [Product], { nullable: true })
  product?: Product[];
}
