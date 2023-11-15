import { Module } from '@nestjs/common';
import { ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { OrderEntity } from './entities/order.entity';
import { CartEntity } from 'apps/cart/src/entities/cart.entity';
import { UserEntity } from 'apps/account/src/apps/user/entities/user.entity';
import { ProductEntity } from 'apps/products/src/entities/product.entity';

@Module({
  imports: [ConfigModule.forRoot({
    expandVariables: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      type: 'postgres',
      username: config.get('TYPEORM_USERNAME'),
      password: config.get('TYPEORM_PASSWORD'),
      database: config.get('TYPEORM_DATABASE'),
      port: 5433,
      name: 'OrderConnection',
      entities: [OrderEntity, CartEntity, UserEntity, ProductEntity],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    })
  }),
  TypeOrmModule.forFeature([OrderEntity]),
  GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: {
      federation: 2,
    },
  }),
  ],
  providers: [OrderService, OrderResolver],
})
export class OrderModule { }
