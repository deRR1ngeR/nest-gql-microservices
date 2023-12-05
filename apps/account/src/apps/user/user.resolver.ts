import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';

import { User, Role } from './entities/user.entity';
import { CurrentUser } from 'libs/auth/decorator/current-user.decorator';
import { Roles } from 'libs/auth/decorator/role.decorator';
import { GqlAuthGuard } from 'libs/auth/guards/gql-auth.guard';
import { RolesGuard } from 'libs/auth/guards/role.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getUser(@CurrentUser() user: User): Promise<User> {
    return this.userService.getUser(user.id);
  }

  @Query(() => User, { name: 'User' })
  async findUserById(email: string) {
    return await this.userService.findUserByEmail(email);
  }

  @Query(() => User, { name: 'User' })
  async findAllUsers() {
    return await this.userService.findAll();
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<User> {
    return this.userService.findUserById(reference.id);
  }
}
