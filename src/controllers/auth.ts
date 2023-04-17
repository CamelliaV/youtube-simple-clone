import { createError } from './../error'
import { RequestHandler, Request, NextFunction, Response } from 'express'
import mongoose from 'mongoose'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({ ...req.body, password: hash })
    console.log('new user prepared')

    // console.log(req.body)
    // res.send(req.body)
    await newUser.save()
    console.log('saved')

    res.status(201).send('User created!')
  } catch (error) {
    // console.log(error)
    // next(createError(404, 'Message Test'))
    next(error)
  }
}
export const signin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ name: req.body.name })
    if (!user) return next(createError(404, 'User not found!'))

    const isCorrect = await bcrypt.compare(req.body.password, user.password!)

    if (!isCorrect) return next(createError(400, 'Wrong credentials!'))
    const token = jwt.sign({ id: user._id }, process.env.JWT!)
    // const { password, ...others } = user // incorrect

    /// @ts-ignore
    const { password, ...others } = user?._doc
    res
      .cookie('access_token', token, {
        httpOnly: true,
        domain: '',
        secure: true,
        sameSite: 'none',
        path: '',
        maxAge: 86400000
      })
      .status(200)
      .json(others)
  } catch (error) {
    next(error)
  }
}
export const google: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      const newUser = new User({ ...req.body, fromGoogle: true })
      user = await newUser.save()
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT!)

    res
      .cookie('access_token', token, {
        httpOnly: true,
        domain: '',
        secure: true,
        path: '',
        sameSite: 'none',
        maxAge: 86400000,
    
      })
      .status(200)
      /// @ts-ignore
      .json(user._doc)
  } catch (error) {
    next(error)
  }
}
