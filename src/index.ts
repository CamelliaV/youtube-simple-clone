import mongoose from 'mongoose'
import express, { Request, Response, RequestHandler } from 'express'
import { ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/users'
import videoRoutes from './routes/videos'
import commentRoutes from './routes/comments'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import path from 'path'
import history from 'connect-history-api-fallback'
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
app.use(history())
app.use(errorHandler)
// console.log(__dirname)
app.use('/', express.static(path.join(__dirname, '..', 'public')))
const connect = () => {
  mongoose
    .connect(process.env.MONGO_DB!)
    .then(() => {
      console.log('Connected To DB!')
    })
    .catch(err => console.log(err))
}

app.get('/', (req, res) => {
  res.sendFile(path.join('index.html'))
})

// app.use('*',  (req: Request, res: Response) => {
//   console.log('Invalid Route')
//   res.status(404).send('Invalid Route!')
// })

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started Successfully!')
  connect()
})
