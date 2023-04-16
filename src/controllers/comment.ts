import { createError } from './../error'
import { AuthRequest, AuthRequestHandler } from './../types/constants'
import { NextFunction, Response, Request, RequestHandler } from 'express'
import Comment from '../models/Comment'
import Video from '../models/Video'
// export const test: RequestHandler = (req, res) => {
//   res.send('test working')
// }

export const addComment: AuthRequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id })
  try {
    const savedComment = await newComment.save()
    res.status(200).send(savedComment)
  } catch (error) {
    next(error)
  }
}

export const deleteComment: AuthRequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.id)
    const video = await Video.findById(req.params.id)
    if (req.user.id === comment!.userId || req.user.id === video!.userId) {
      await Comment.findByIdAndDelete(req.params.id)
      res.status(200).json('Comment Deleted!')
    } else {
      return next(createError(403, 'You can delete only your comment!'))
    }
  } catch (error) {
    next(error)
  }
}

export const getComments: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}
