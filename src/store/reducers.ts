import { createReducer } from '@reduxjs/toolkit'
import {
  updateLoginFormPart,
  addTask,
  removeTask,
  setSort,
  updateUnsavedTask,
  updateUnsavedTaskPart,
  saveTask,
  addNotification,
  removeNotification,
  fetchTasks,
} from './actions'
import { TaskList, Notification, Sort, LoginForm } from './types'
import { sortByType } from '../utils'

const loginFormInitState: LoginForm = {
  username: '',
  password: '',
}

export const loginFormReducer = createReducer<LoginForm>(
  loginFormInitState,
  (builder) =>
    builder.addCase(updateLoginFormPart, (state, action) => {
      const { key, value } = action.payload

      state[key as keyof typeof loginFormInitState] = value
    })
)

const taskListInitState: TaskList = {
  unsaved:
    // @todo remove this template
    process.env.NODE_ENV === 'development'
      ? {
          name: 'User1',
          email: 'user1@example.com',
          description: 'Bla bla foo bar task',
          done: false,
          edited: false,
        }
      : null,
  list: [],
  sort: Sort.idStart,
}

export const taskListReducer = createReducer<TaskList>(
  taskListInitState,
  (builder) =>
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        if (!(action.payload instanceof Error)) {
          state.list = action.payload
        }
      })
      .addCase(setSort, (state, action) => {
        const { type } = action.payload

        state.list = sortByType(state.list, type)
        state.sort = type
      })
      .addCase(addTask, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(removeTask, (state, action) => {
        state.list.filter(({ id }) => id !== action.payload.id)
      })
      .addCase(saveTask.fulfilled, (state, action) => {
        if (action.payload && !(action.payload instanceof Error)) {
          state.list.push(action.payload)
        }
      })
      .addCase(updateUnsavedTask, (state, action) => {
        state.unsaved = action.payload
      })
      .addCase(updateUnsavedTaskPart, (state, action) => {
        const { key, value } = action.payload

        if (state.unsaved === null) {
          state.unsaved = {
            name: '',
            email: '',
            description: '',
            done: false,
            edited: false,
          }
        }

        state.unsaved = {
          ...state.unsaved,
          [key]: value,
        }
      })
)

const notificationInitState: Notification[] = []

export const notificationsReducer = createReducer<Notification[]>(
  notificationInitState,
  (builder) =>
    builder
      .addCase(addNotification, (state, action) => {
        state.push(action.payload)
      })
      .addCase(removeNotification, (state, action) => {
        state.shift()
      })
)
