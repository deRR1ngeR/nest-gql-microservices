import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { GetUserArgs } from './dto/get-user.args';

@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>) { }

  async create(createUserInput: CreateUserInput) {

    const isUserExist = await this.findUserByEmail(createUserInput.email);
    if (isUserExist) {
      throw new UnauthorizedException('User with such email is already exists');
    }

    const salt = genSaltSync(10);

    const newUser: CreateUserInput = {
      email: createUserInput.email,
      name: createUserInput.name,
      password: hashSync(createUserInput.password, salt)
    }
    return await this.userRepository.save({ ...newUser })
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email })
  }

  public getUser(getUserArgs: GetUserArgs): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id: +getUserArgs.userId });
  }

}

