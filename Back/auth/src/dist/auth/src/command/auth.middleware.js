"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthMiddleware {
    constructor(secret) {
        this.secret = secret;
    }
    execute(req, res, next) {
        if (req.headers.authorization) {
            (0, jsonwebtoken_1.verify)(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
                if (err) {
                    next();
                }
                else if (payload && typeof payload === 'object' && 'email' in payload && 'id' in payload) {
                    // Приводим payload к JwtPayload
                    req.user = { id: payload.id, email: payload.email };
                    next();
                }
                else {
                    next();
                }
            });
        }
        else {
            next();
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
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
