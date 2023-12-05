import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from 'libs/db/typeorm/typeorm/product.entity';
import { DbModule } from 'libs/db/typeorm/typeorm.module';
import { JwtStrategy } from 'libs/auth/strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    DbModule,
    TypeOrmModule.forFeature([Product]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [
    ProductService,
    ProductResolver,
    JwtStrategy
  ],
})
export class ProductModule { }
