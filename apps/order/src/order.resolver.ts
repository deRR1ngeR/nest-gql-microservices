import { Resolver } from '@nestjs/graphql';
import { OrderEntity } from './entities/order.entity';

@Resolver(() => OrderEntity)
export class OrderResolver {

}