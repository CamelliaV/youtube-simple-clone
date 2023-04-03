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

type CommentType = InferSchemaType<typeof CommentSchema>

export default mongoose.model('Comment', CommentSchema)
