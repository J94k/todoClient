import { configureStore } from '@reduxjs/toolkit'
import {
  isAdminReducer,
  taskListReducer,
  sortReducer,
  notificationsReducer,
} from './reducers'
import { State } from './types'

export default configureStore<State>({
  reducer: {
    isAdmin: isAdminReducer,
    sort: sortReducer,
    tasks: taskListReducer,
    notifications: notificationsReducer,
  },
})
