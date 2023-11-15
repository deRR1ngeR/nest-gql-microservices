import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { OrderEntity } from 'apps/order/src/entities/order.entity';

@InputType()
export class CreateUserInput {

    @Field()
    email: string

    @Field()
    password: string;

    @Field()
    name: string;
}