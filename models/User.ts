import mongoose, { InferSchemaType } from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    img: {
      type: String
    },
    subscribers: {
      type: Number,
      default: 0
    },
    subscribedUsers: {
      type: [String]
    }
  },
  { timestamps: true }
)

type UserType = InferSchemaType<typeof UserSchema>

export default mongoose.model('User', UserSchema)
