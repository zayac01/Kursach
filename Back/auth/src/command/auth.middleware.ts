import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      verify(token, this.secret, (err, payload) => {
        if (err || !payload || typeof payload !== 'object' || !('id' in payload) || !('email' in payload)) {
          return next(); // Если токен недействителен, пользователь не аутентифицирован
        }
        req.user = { id: (payload as JwtPayload).id, email: (payload as JwtPayload).email };
        next();
      });
    } else {
      next();
    }
  }
}

    // execute(req: Request, res: Response, next: NextFunction): void {
    //     if (req.headers.authorization) {
    //         verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
    //             if (err) {
    //                 next();
    //             } else if (payload && typeof payload === 'object' && 'email' in payload) {
    //                 req.user = (payload as JwtPayload).email;
    //                 next();
    //             } else {
    //                 next();
    //             }
    //         });
    //     } else {
    //         next();
    //     }
    // }

// }
