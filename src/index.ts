import mongoose from 'mongoose'
import express from 'express'
import { ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/users'
import videoRoutes from './routes/videos'
import commentRoutes from './routes/comments'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import path from 'path'
dotenv.config()
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/auth', authRoutes)
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err?.status || 500
  const message = err?.message || 'Something went wrong'
  return res.status(status).json({
    status,
    message,
    success: false
  })
}
app.use('/', express.static(path.join(__dirname, '..', 'public')))

app.use(express.static('public'))
app.use(errorHandler)

const connect = () => {
  mongoose
    .connect(process.env.MONGO_DB!)
    .then(() => {
      console.log('Connected To DB!')
    })
    .catch(err => console.log(err))
}

// app.get('/', (req, res) => {
//   console.log('Hi')
//   res.send('Hi')
// })

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started Successfully!')
  connect()
})



