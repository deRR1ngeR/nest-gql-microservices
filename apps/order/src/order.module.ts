import { Module } from '@nestjs/common';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order } from 'libs/db/typeorm/typeorm/order.entity';
import { DbModule } from 'libs/db/typeorm/typeorm.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtStrategy } from 'libs/auth/strategy/jwt.strategy';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    DbModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Order]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [OrderService, OrderResolver, JwtStrategy, UserService],
  exports: [OrderService],
})
export class OrderModule { }
