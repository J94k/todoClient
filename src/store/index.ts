import { configureStore } from '@reduxjs/toolkit'
import {
  isAdminReducer,
  taskListReducer,
  sortReducer,
  unsavedTaskReducer,
} from './reducers'
import { State } from './types'

export default configureStore<State>({
  reducer: {
    isAdmin: isAdminReducer,
    sort: sortReducer,
    unsavedTask: unsavedTaskReducer,
    taskList: taskListReducer,
  },
})
