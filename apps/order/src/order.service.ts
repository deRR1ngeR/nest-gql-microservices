import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'libs/db/typeorm/typeorm/order.entity';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { createCartInput } from './dto/creat-cart.input';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
  ) {}

  async createOrder(id: number, data: createCartInput) {
    const order = new Order();
    order.orderStatus = data.orderStatus;
    order.totalAmount = data.totalAmount;

    order.user = { ...(await this.userService.getUserById(id)) };

    const res = await this.orderRepository.save({ ...order });

    console.log('res' + res);

    return res;
  }
}
