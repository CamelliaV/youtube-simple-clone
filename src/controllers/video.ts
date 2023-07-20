import { VideoType } from './../models/Video'
import { createError } from './../error'
import { RequestHandler, Request, NextFunction, Response } from 'express'
import Video from '../models/Video'
import User from '../models/User'

// create a video
export const addVideo: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /// @ts-ignore
  const newVideo = new Video({ userId: req.user.id, ...req.body })
  try {
    const savedVideo = await newVideo.save()
    res.status(200).json(savedVideo)
  } catch (error) {
    next(error)
  }
}
// update a video
export const updateVideo: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id)
    if (!video) return next(createError(404, 'Video not found'))
    /// @ts-ignore
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      )
      res.status(200).json(updatedVideo)
    } else {
      return next(createError(403, 'You can update only your video!'))
    }
  } catch (error) {
    next(error)
  }
} // delete a video
export const deleteVideo: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id)
    if (!video) return next(createError(404, 'Video not found'))
    /// @ts-ignore
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id)
      res.status(200).json('Video deleted successfully!')
    } else {
      return next(createError(403, 'You can delete only your video!'))
    }
  } catch (error) {
    next(error)
  }
}
// find a video
export const getVideo: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id)
    res.status(200).json(video)
  } catch (error) {
    next(error)
  }
}
// add view
export const addView: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 }
    })
    res.status(200).json('View incremented!')
  } catch (error) {
    next(error)
  }
}
// trend
export const trend: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videos = await Video.find().sort({ views: -1 })
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}
// random
export const random: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }])
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}
// sub
export const sub: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /// @ts-ignore
    const user = await User.findById(req.user.id) 
    if (!user) return next(createError(404, 'User not exist'))
    const subscribedChannels = user.subscribedUsers
    const list = await Promise.all(
      subscribedChannels.map(channelId => {
        return Video.find({ userId: channelId })
      })
    )
    res.status(200).json(
      list
        .flat()
        .sort(
          (a: VideoType, b: VideoType) =>
            b.createdAt.valueOf() - a.createdAt.valueOf()
        )
      // Also work for minus between new Date()
    )
  } catch (error) {
    next(error)
  }
}
export const getByTag: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.query.tags)
    if (!req.query.tags) res.status(200).json('')
    const tagsString = req.query.tags as string
    const tags = tagsString.split(',')
    const videos = await Video.find({ tags: { $in: tags } }).limit(20)
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}
export const search: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.q
    const videos = await Video.find({
      title: { $regex: query, $options: 'i' }
    }).limit(40)
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}
