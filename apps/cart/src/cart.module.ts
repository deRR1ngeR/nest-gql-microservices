import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { ProductEntity } from 'apps/products/src/entities/product.entity';
import { UserEntity } from 'apps/account/src/apps/user/entities/user.entity';
import { OrderEntity } from 'apps/order/src/entities/order.entity';

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
      entities: [CartEntity, OrderEntity, UserEntity, ProductEntity],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    })
  }),
  TypeOrmModule.forFeature([CartEntity]),
  GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: {
      federation: 2,
    },
  }),
  ],
  providers: [CartService, CartResolver],
  exports: [CartService]
})
export class CartModule { }
