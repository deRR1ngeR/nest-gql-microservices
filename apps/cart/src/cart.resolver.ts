import {
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Cart } from './entities/cart.entity';
import { CartService } from './cart.service';
// import { User } from './entities/user.entity';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'libs/auth/guards/gql-auth.guard';
import { RolesGuard } from 'libs/auth/guards/role.guard';
import { CurrentUser } from 'libs/auth/decorator/current-user.decorator';
import { User } from 'libs/db/typeorm/typeorm/user.entity';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => Cart, { name: 'cart' })
  findAll(@CurrentUser() user: User): Promise<Cart> {
    return this.cartService.findAll(user.id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Cart, { name: 'createCart' })
  async createCart(@CurrentUser() user: User): Promise<Cart> {
    return await this.cartService.createCart(user.id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Cart, { name: 'removeCart' })
  async removeCart(@CurrentUser() user: User) {
    return await this.cartService.removeCart(user.id).toString();
  }

  @ResolveField(() => User)
  user(@Parent() cart: Cart): any {
    return { __typename: 'Cart', id: cart.user };
  }
}
