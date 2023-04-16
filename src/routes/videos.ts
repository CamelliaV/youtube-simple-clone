import {
  updateVideo,
  addVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  random,
  sub,
  getByTag,
  search
} from './../controllers/video'
import { verifyToken } from './../verifyToken'
import express from 'express'

const router = express.Router()


router.post('/', verifyToken, addVideo)
router.put('/:id', verifyToken, updateVideo)
router.delete('/:id', verifyToken, deleteVideo)
router.get('/find/:id', getVideo)
router.put('/view/:id', addView)
router.get('/trend', trend)
router.get('/random', random)
router.get('/sub', verifyToken, sub)
router.get('/tags', getByTag)
router.get('/search', search)

export default router
