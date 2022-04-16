import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class authMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization');
      if (!token) {
        throw new HttpException('Authorization failed!', 500);
      }
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!verifiedToken) {
        throw new HttpException('Authorization denied!', 400);
      }
      req['userEmail'] = verifiedToken;
      next();
    } catch (err) {
      throw new HttpException('Something went wrong!', 500);
    }
  }
}
