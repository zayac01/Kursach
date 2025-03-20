import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { promisify } from 'util';

const verifyAsync = promisify(verify);

export class AuthMiddleware implements IMiddleware {
    constructor(private secret: string) {}

    execute(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Токен отсутствует' });
        }
        verifyAsync(token, this.secret)
            .then((payload) => {
                if (payload && typeof payload === 'object' && 'id' in payload && 'email' in payload) {
                    req.user = { id: payload.id, email: payload.email };
                    next();
                } else {
                    return res.status(401).json({ error: 'Невалидный токен' });
                }
            })
            .catch(() => {
                return res.status(401).json({ error: 'Невалидный токен' });
            });
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
