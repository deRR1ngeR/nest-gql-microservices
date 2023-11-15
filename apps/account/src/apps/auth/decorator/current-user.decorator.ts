import { createParamDecorator } from '@nestjs/common';
import { GraphQLExecutionContext } from '@nestjs/graphql';
import { UserService } from '../../user/user.service';
import { ExtractJwt } from 'passport-jwt';

export const CurrentUser = createParamDecorator(
    (_data: any, ctx: GraphQLExecutionContext) => {
        try {
            const headers = ctx.getArgs()[2].req;
            if (headers.authorization) {
                return headers.authorization;
            }
        } catch (err) {
            return null;
        }
    },
);