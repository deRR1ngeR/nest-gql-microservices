import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcryptjs';
import { User, Role } from 'libs/db/typeorm/typeorm/user.entity';
import StripeService from './stripe/stripe.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly stripeService: StripeService
  ) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const isUserExist = await this.findUserByEmail(createUserInput.email);
    if (isUserExist) {
      throw new UnauthorizedException('User with such email is already exists');
    }

    const salt = genSaltSync(10);

    const newUser: CreateUserInput = {
      email: createUserInput.email,
      name: createUserInput.name,
      password: hashSync(createUserInput.password, salt),
    };
    const customerId = (await this.stripeService.createCustomer(newUser.name, newUser.email)).id;
    return await this.userRepository.save({ ...newUser, role: Role.Admin, customerId });
  }

  async findAll() {
    const res = await this.userRepository.find();
    return res;
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findUserByEmail(email: string) {
    const res = await this.userRepository.findOne({
      where: { email },
      relations: ['orders'],
    });
    return res;
  }

  async getUser(id: number): Promise<User> {
    const res = await this.userRepository.findOne({
      where: { id },
      relations: ['orders', 'cart'],
    });
    return res;
  }
}
