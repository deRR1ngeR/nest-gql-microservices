import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Cart } from './cart.entity';

export enum Role {
  User = 'USER',
  Guest = 'GUEST',
  Admin = 'ADMIN',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  customerId?: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Guest,
  })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn()
  cart?: Cart;
}
