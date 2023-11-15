import { Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CartEntity } from './entities/cart.entity';
import { CartService } from './cart.service';
import { User } from './entities/user.entity';

@Resolver(() => CartEntity)
export class CartResolver {
    constructor(private readonly cartService: CartService) { }


    @ResolveField(() => User)
    user(@Parent() cart: CartEntity): any {
        return { __typename: 'User', id: cart.userId }
    }
}