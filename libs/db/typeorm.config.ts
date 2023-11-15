import { ConfigService } from '@nestjs/config';
import { CartEntity } from 'apps/cart/src/entities/cart.entity';
import { OrderEntity } from 'apps/order/src/entities/order.entity';
import { ProductEntity } from 'apps/products/src/entities/product.entity';
import { UserEntity } from 'apps/user/src/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: '1234',
    database: 'catalog',
    entities: [UserEntity, ProductEntity, CartEntity, OrderEntity],
    migrations: ['libs/db/migrations/*.ts'],

}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;