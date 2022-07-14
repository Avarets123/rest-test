import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TypeReq } from '../interfaces/req.type';

export const UserDec = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<TypeReq>();

  if (!req.user) {
    return null;
  }

  if (data) {
    return req.user[data];
  }

  return req.user;
});
