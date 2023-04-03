import { createError } from './../error'
import { Request, Response, NextFunction, RequestHandler } from 'express'

import User from '../models/User'
import Video from '../models/Video'
// export const test: RequestHandler = (req, res) => {
//   res.send('test working')
// }

// update user
export const update: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      next(error)
    }
  } else {
    return next(createError(403, 'You can update only your account'))
  }
}
// delete user
export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /// @ts-ignore
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('User has been deleted.')
    } catch (error) {
      next(error)
    }
  } else {
    return next(createError(403, 'You can delete only your account'))
  }
}
// get a user
export const getUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
// subscribe a user
export const subscribe: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /// @ts-ignore
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id }
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 }
    })
    res.status(200).json('Subscribed!')
  } catch (error) {
    next(error)
  }
}
// unsubscribe a user
export const unsubscribe: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /// @ts-ignore
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id }
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 }
    })
    res.status(200).json('Unsubscribed!')
  } catch (error) {
    next(error)
  }
}
// like a video
export const like: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user.id
  const videoId = req.params.videoId
  try {
    const isLiked = await Video.findOne({ _id: videoId, likes: { $in: id } })
    if (isLiked) {
      await Video.findByIdAndUpdate(videoId, {
        $pull: { likes: id }
      })
      return res.status(200).json('Canceled like for the video')
    }
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id }
    })
    res.status(200).json('The video has been liked!')
  } catch (error) {
    next(error)
  }
}
// dislike a videod
export const dislike: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user.id
  const videoId = req.params.videoId
  try {
    const isDisliked = await Video.findOne({ _id: videoId, dislikes: { $in: id } })
    if (isDisliked) {
      await Video.findByIdAndUpdate(videoId, {
        $pull: { dislikes: id }
      })
      return res.status(200).json('Canceled dislike for the video')
    }
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id }
    })
    res.status(200).json('The video has been disliked!')
  } catch (error) {
    next(error)
  }
}
