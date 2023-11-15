import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginResponse } from '../auth/response/login.response';
import { AuthService } from '../auth/auth.service';
import { LoginUserInput } from '../auth/dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { GetUserArgs } from './dto/get-user.args';

@Resolver(() => UserEntity)
export class UserResolver {
    constructor(private readonly userService: UserService,
        private readonly authService: AuthService) { }



    @Mutation(() => UserEntity)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return await this.userService.create(createUserInput);
    }

    @Query(() => UserEntity, { name: 'user', nullable: true })
    @UseGuards(GqlAuthGuard)
    getUser(@CurrentUser() user: UserEntity, @Args() getUserArgs: GetUserArgs): Promise<UserEntity> {
        return this.userService.getUser(getUserArgs);
    }

    @Mutation(() => LoginResponse)
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return await this.authService.login(loginUserInput)
    }

    @Query(() => UserEntity, { name: 'User' })
    async findUserById(email: string) {
        return await this.userService.findUserByEmail(email);
    }

    @Query(() => UserEntity, { name: 'User' })
    async findAllUsers() {
        return await this.userService.findAll();
    }

    @ResolveReference()
    resolveReference(reference: { __typename: string, id: string }): Promise<UserEntity> {
        return this.userService.findOne(+reference.id)
    }
}