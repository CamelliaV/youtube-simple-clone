import { RequestHandler, Request, Response, NextFunction } from 'express'
export interface AuthRequest extends Request {
  user: { id: string }
}

export interface AuthRequestHandler extends RequestHandler {
  (req: AuthRequest, res: Response, next: NextFunction): void
}

declare module 'express-serve-static-core' {
  interface Request {
    user: { id: string }
  }
}
