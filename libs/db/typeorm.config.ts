import { DataSource, DataSourceOptions } from 'typeorm';
import { Cart } from './typeorm/typeorm/cart.entity';
import { Order } from './typeorm/typeorm/order.entity';
import { Product } from './typeorm/typeorm/product.entity';
import { User } from './typeorm/typeorm/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '1234',
  database: 'catalog',
  entities: [User, Product, Cart, Order],
  migrations: ['libs/db/migrations/*.ts'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
