import { configureStore } from '@reduxjs/toolkit'
import {
  userIsLoggedInReducer,
  loginFormReducer,
  taskListReducer,
  notificationsReducer,
} from './reducers'
import { State } from './types'

const store = configureStore<State>({
  reducer: {
    userIsLoggedIn: userIsLoggedInReducer,
    loginForm: loginFormReducer,
    tasks: taskListReducer,
    notifications: notificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
