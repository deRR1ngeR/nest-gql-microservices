import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true; // No specific roles required, access is granted
    }

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    if (!user) {
      return false; // No user, access is denied
    }
    return roles.some((role) => user.role.includes(role));
  }
}
