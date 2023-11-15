import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'apps/account/src/apps/user/entities/user.entity';
import { ProductEntity } from 'apps/products/src/entities/product.entity';
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('cart')
@Directive('@key(fields: "id")')
export class CartEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => UserEntity)
    @OneToOne(() => UserEntity)
    @JoinColumn()
    userId?: UserEntity;

    @Field(() => [ProductEntity])
    @ManyToMany(() => ProductEntity)
    @JoinTable()
    product: ProductEntity[]
}