import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole, ActiveUser } from './user-roles.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(), 
      context.getClass(),  
    ]);

    if (!requiredRoles) {
      return true;
    }


    const { user } = context.switchToHttp().getRequest();
    const activeUser = user as ActiveUser; 

    return requiredRoles.some((role) => activeUser.role?.includes(role));
    
  }
}