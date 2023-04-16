import { createSlice } from '@reduxjs/toolkit'
import { VideoType } from '../types/Video'

interface videoStateType {
  video: VideoType | null
  loading: boolean
  error: boolean
}

const videoDefault: videoStateType = {
  video: null,
  loading: false,
  error: false
}

const initialState: videoStateType = { ...videoDefault }

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchStart: state => {
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.video = action.payload
    },
    fetchFailure: state => {
      state.loading = false
      state.error = true
    },
    like: (state, action) => {
      const likes = state.video?.likes!
      const dislikes = state.video?.dislikes!
      if (likes.includes(action.payload)) {
        likes.splice(
          likes.findIndex(userId => userId == action.payload),
          1
        )
        return
      }
      likes.push(action.payload)
      dislikes.splice(
        dislikes.findIndex(userId => userId == action.payload),
        1
      )
    },
    dislike: (state, action) => {
      const likes = state.video?.likes!
      const dislikes = state.video?.dislikes!
      if (dislikes.includes(action.payload)) {
        dislikes.splice(
          dislikes.findIndex(userId => userId == action.payload),
          1
        )
        return
      }
      dislikes.push(action.payload)
      likes.splice(
        likes.findIndex(userId => userId == action.payload),
        1
      )
    }
  }
})

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
  videoSlice.actions
export default videoSlice.reducer
