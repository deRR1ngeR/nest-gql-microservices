import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { CurrentUser } from 'libs/auth/decorator/current-user.decorator';
import { User } from 'libs/db/typeorm/typeorm/user.entity';
import { OrderService } from './order.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'libs/auth/guards/gql-auth.guard';
import { RolesGuard } from 'libs/auth/guards/role.guard';
import { createCartInput } from './dto/creat-cart.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Order)
  async createOrder(
    @CurrentUser() user: User,
    @Args('createCartInput') data: createCartInput,
  ) {
    return await this.orderService.createOrder(user.id, data);
  }
}
