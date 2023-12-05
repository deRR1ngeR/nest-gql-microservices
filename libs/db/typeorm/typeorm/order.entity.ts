import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Cart } from './cart.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderStatus: boolean;

  @Column()
  totalAmount: number;

  @OneToOne(() => Cart)
  @JoinColumn()
  Cart: Cart;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
