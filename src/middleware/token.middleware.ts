//middleware to check token is present in headers or not


import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader) {
      const [bearer, token] = authorizationHeader.split(' ');

      // Store token details in the request object for Order creation
      req['token'] = { token };
      if (!token.length) {
        res.status(401).json({ message: 'Unauthorized. Token not present.' });
      }
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized. Token not present.' });
    }
  }
}