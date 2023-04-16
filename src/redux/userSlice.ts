import { createSlice } from '@reduxjs/toolkit'
import { UserType } from '../types/User'

interface userStateType {
  user: UserType | null
  loading: boolean
  error: boolean
}

const userDefault: userStateType = {
  user: null,
  loading: false,
  error: false
}

const initialState: userStateType = { ...userDefault }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: state => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
    },
    loginFailure: state => {
      state.loading = false
      state.error = true
    },
    logout: state => {
      state = { ...userDefault }
    },
    subscribe: (state, action) => {
      const subscribed = state.user?.subscribedUsers!
      if (subscribed.includes(action.payload)) {
        subscribed.splice(
          subscribed.findIndex(channelId => channelId === action.payload),
          1
        )
        return
      }
      subscribed.push(action.payload)
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout, subscribe } =
  userSlice.actions
export default userSlice.reducer
