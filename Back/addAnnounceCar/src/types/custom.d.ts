
declare namespace Express {
    export interface Request {
      user?: {
        id: number;
        email?: string;
      }
    }
  }
  
// declare namespace jsonwebtoken {
//     export interface JwtPayload {
//         email: string
//     }
// }