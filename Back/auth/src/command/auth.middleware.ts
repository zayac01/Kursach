import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { promisify } from 'util';

const verifyAsync: (token: string, secret: string) => Promise<JwtPayload | string> = promisify(verify);
// 1
export class AuthMiddleware implements IMiddleware {
    constructor(private secret: string) {}

    execute(req: Request, res: Response, next: NextFunction): void {
        // Пропускаем публичные маршруты
        if (req.path === '/users/register' ||
            req.path === '/users/login' ||
            req.path === '/auth' ||
            req.path === '/ads') {
            return next();
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Токен отсутствует' });
            return;
        }
        const verifyWithSecret = (token: string, callback: (err: any, decoded: any) => void) => {
            verify(token, this.secret, callback);
        };
        const verifyAsync = promisify(verifyWithSecret);

        verifyAsync(token)
            .then((payload: JwtPayload | string) => {
                if (typeof payload === 'object' && 'id' in payload && 'email' in payload) {
                    req.user = { id: payload.id, email: payload.email };
                    next();
                } else {
                    res.status(401).json({ error: 'Невалидный токен' });
                }
            })
            .catch(() => {
                res.status(401).json({ error: 'Невалидный токен' });
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
