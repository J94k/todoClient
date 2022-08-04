import { configureStore } from '@reduxjs/toolkit'
import {
  isAdminReducer,
  taskListReducer,
  notificationsReducer,
} from './reducers'
import { State } from './types'

const store = configureStore<State>({
  reducer: {
    isAdmin: isAdminReducer,
    tasks: taskListReducer,
    notifications: notificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
