import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderEntity } from 'apps/order/src/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('user')
@Directive('@key(fields: "id")')
export class UserEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    email: string

    @Field()
    @Column()
    password: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ default: true })
    isAdmin: boolean;

    @Field(() => [OrderEntity])
    @OneToMany(() => OrderEntity, order => order.user)
    orders: OrderEntity[];
}