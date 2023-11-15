import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway'
import { authContext } from './auth.context';
import { UserModule } from 'apps/account/src/apps/user/user.module';
@Module({
  imports: [ConfigModule.forRoot({
    expandVariables: true,
  }),
    UserModule,
  GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
    driver: ApolloGatewayDriver,
    server: {
      context: authContext,
    },
    gateway: {
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
          {
            name: 'users',
            url: 'http://localhost:3001/graphql',
          },
          // {
          //   name: 'orders',
          //   url: 'http://localhost:3003/graphql',
          // },
          {
            name: 'products',
            url: 'http://localhost:3002/graphql',
          },
          // {
          //   name: 'cart',
          //   url: 'http://localhost:3004/graphql',
          // },
        ]
      }),
      buildService({ url }) {
        return new RemoteGraphQLDataSource({
          url,
          willSendRequest({ request, context }) {
            request.http.headers.set(
              'Authorization',
              context.token ? context.token : null,
            )
          }
        })
      },
    }
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
