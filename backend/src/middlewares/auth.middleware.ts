import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { TypeReq } from 'src/user/interfaces/req.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async use(req: TypeReq, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const dataToken = this.jwtService.verify(token);

      const user = await this.userService.getAllUserOrUserById(dataToken.data);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
