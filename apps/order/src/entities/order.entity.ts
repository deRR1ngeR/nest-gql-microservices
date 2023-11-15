import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'apps/account/src/apps/user/entities/user.entity';
import { CartEntity } from 'apps/cart/src/entities/cart.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('orders')
@Directive('@key(fields: "id")')
export class OrderEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    orderStatus: boolean;

    @Field()
    @Column()
    totalAmount: number;

    @OneToOne(() => CartEntity)
    @JoinColumn()
    Cart: CartEntity;

    @ManyToOne(() => UserEntity, user => user.orders)
    user: UserEntity;
}