import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'libs/db/typeorm/typeorm/cart.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly userService: UserService,
  ) {}

  async createCart(id: number): Promise<Cart> {
    const cart = new Cart();
    cart.user = { ...(await this.userService.getUserById(id)) };

    const isCartExists = await this.findAll(id);

    console.log(isCartExists);

    if (isCartExists) {
      throw new ConflictException('Cart already exists');
    }

    const res = await this.cartRepository.save({ ...cart });

    console.log('res' + res);

    return res;
  }

  async removeCart(id: number) {
    const user = { ...(await this.userService.getUserById(id)) };

    return await this.cartRepository.delete({ ...user });
  }

  async findAll(id: number) {
    const user = { ...(await this.userService.getUserById(id)) };
    const res = await this.cartRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: ['user'],
    });

    console.log(res);
    return res;
  }
}
