import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class authMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization').split(' ')[1];
      if (!token) {
        throw new HttpException('Authorization failed!', 500);
      }
      // Verify token
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!verifiedToken) {
        throw new HttpException('Authorization denied!', 400);
      }
      // Assign user email to request
      req.userEmail = verifiedToken;
      next();
    } catch (err) {
      throw new HttpException('Something went wrong in authorization!', 500);
    }
  }
}
