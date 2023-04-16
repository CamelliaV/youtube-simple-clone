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
      type: String
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
    },
    fromGoogle: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

type UserType = InferSchemaType<typeof UserSchema>

export default mongoose.model('User', UserSchema)
