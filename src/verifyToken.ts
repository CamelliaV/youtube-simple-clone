import { AuthRequest, AuthRequestHandler } from './types/constants'
import { createError } from './error'
import { RequestHandler, Response, NextFunction } from 'express'
import { VerifyCallback } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

export const verifyToken: AuthRequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token
  if (!token) return next(createError(401, 'Not authenticated!'))

  const callback: VerifyCallback = (err, user) => {
    if (err) return next(createError(403, 'Token not valid!'))
    // console.log(user)
    req.user = user as { id: string }
    next()
  }

  jwt.verify(token, process.env.JWT!, callback)
}
