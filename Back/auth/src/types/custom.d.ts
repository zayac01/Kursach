
// declare namespace Express {
//     export interface Request {
//         user: string
//     }
// }

// declare namespace jsonwebtoken {
//     export interface JwtPayload {
//         email: string
//     }
// }

declare namespace Express {
    export interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
  
  declare namespace jsonwebtoken {
    export interface JwtPayload {
      id: number; // Добавляем id в payload
      email: string;
    }
  }