import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { AuthModule } from '../auth/auth.module';
import { User } from 'libs/db/typeorm/typeorm/user.entity';
import { DbModule } from 'libs/db/typeorm/typeorm.module';
import { UserController } from './user.controller';
import StripeService from './stripe/stripe.service';
import { StripeResolver } from './stripe.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    DbModule,
    TypeOrmModule.forFeature([User]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService, UserResolver, StripeService, StripeResolver],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
