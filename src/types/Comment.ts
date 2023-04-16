import mongoose, { InferSchemaType } from 'mongoose'

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    videoId: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export type CommentType = InferSchemaType<typeof CommentSchema> & {_id: string}
