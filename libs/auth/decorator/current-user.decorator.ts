import { createParamDecorator } from '@nestjs/common';
import { GraphQLExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_data: any, ctx: GraphQLExecutionContext) => {
    try {
      const headers = ctx.getArgs()[2].req;
      if (headers.user) {
        return headers.user;
      }
    } catch (err) {
      return null;
    }
  },
);
