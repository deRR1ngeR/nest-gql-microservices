import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { OrderEntity } from 'apps/order/src/entities/order.entity';
import { CartEntity } from 'apps/cart/src/entities/cart.entity';
import { ProductEntity } from 'apps/products/src/entities/product.entity';
import { LocalStrategy } from '../auth/strategy/local.strategy';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from '../auth/constants';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

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
      name: 'UserConnection',
      entities: [UserEntity, OrderEntity, CartEntity, ProductEntity],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    })
  }),
  TypeOrmModule.forFeature([UserEntity]),
  GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: {
      federation: 2,
    },
  }),
  forwardRef(() => AuthModule),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: jwtSecret,
    signOptions: { expiresIn: '3600s' }
  })
  ],
  providers: [UserService, UserResolver, LocalStrategy, JwtStrategy],
  exports: [UserService]
})
export class UserModule { }
