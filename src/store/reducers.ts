import { createReducer } from '@reduxjs/toolkit'
import {
  setIsAdmin,
  addTask,
  removeTask,
  setSort,
  updateUnsavedTask,
  updateUnsavedTaskPart,
  saveTask,
  addNotification,
  removeNotification,
} from './actions'
import { TaskList, Notification } from './types'

export const isAdminReducer = createReducer<boolean>(false, (builder) =>
  builder.addCase(setIsAdmin, (state, action) => {
    state = action.payload
  })
)

const taskListInitState: TaskList = {
  unsaved: null,
  list: [],
}

export const taskListReducer = createReducer<TaskList>(
  taskListInitState,
  (builder) =>
    builder
      .addCase(addTask, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(removeTask, (state, action) => {
        state.list.filter(({ id }) => id !== action.payload.id)
      })
      .addCase(updateUnsavedTask, (state, action) => {
        state.unsaved = action.payload
      })
      .addCase(updateUnsavedTaskPart, (state, action) => {
        const { key, value } = action.payload

        if (state.unsaved === null) {
          state.unsaved = {
            username: '',
            email: '',
            description: '',
            completed: false,
          }
        }

        state.unsaved = {
          ...state.unsaved,
          [key]: value,
        }
      })
      .addCase(saveTask.fulfilled, (state, action) => {
        if (!(action.payload instanceof Error)) {
          state.list.push(action.payload)
        }
      })
)

const sortInitState = { type: '' }

export const sortReducer = createReducer<{ type: string }>(
  sortInitState,
  (builder) =>
    builder.addCase(setSort, (state, action) => {
      const { type } = action.payload

      state.type = type
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
