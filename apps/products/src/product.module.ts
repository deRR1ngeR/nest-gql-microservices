import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CartEntity } from 'apps/cart/src/entities/cart.entity';
import { OrderEntity } from 'apps/order/src/entities/order.entity';
import { UserEntity } from 'apps/account/src/apps/user/entities/user.entity';

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
      name: 'ProductConnection',
      entities: [ProductEntity, CartEntity, OrderEntity, UserEntity],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    })
  }),
  TypeOrmModule.forFeature([ProductEntity]),
  GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: {
      federation: 2,
    },
  }),
  ],
  providers: [ProductService, ProductResolver]
})
export class ProductModule { }
