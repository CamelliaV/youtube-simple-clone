import { addComment, getComments } from './../controllers/comment'
import { verifyToken } from './../verifyToken'
import express from 'express'
import { deleteComment } from '../controllers/comment'

const router = express.Router()

router.post('/', verifyToken, addComment)
router.delete('/:id', verifyToken, deleteComment)
router.get('/:videoId', getComments)

export default router
