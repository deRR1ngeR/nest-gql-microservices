import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { CartEntity } from './cart.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {

    @Field(() => ID)
    id: number;

    @Field(() => [CartEntity])
    carts?: CartEntity[];
}