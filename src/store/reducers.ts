import { createReducer } from '@reduxjs/toolkit'
import {
  setIsAdmin,
  addTask,
  removeTask,
  setSort,
  updateUnsavedTask,
  updateUnsavedTaskPart,
} from './actions'
import { Task } from './types'

export const isAdminReducer = createReducer<boolean>(false, (builder) => {
  builder.addCase(setIsAdmin, (state, action) => {
    state = action.payload
  })
})

const taskListInitState: Task[] = []

export const taskListReducer = createReducer<Task[]>(
  taskListInitState,
  (builder) => {
    builder
      .addCase(addTask, (state, action) => {
        state.push(action.payload)
      })
      .addCase(removeTask, (state, action) => {
        state.filter(({ id }) => id !== action.payload.id)
      })
  }
)

const sortInitState = { type: '' }

export const sortReducer = createReducer<{ type: string }>(
  sortInitState,
  (builder) => {
    builder.addCase(setSort, (state, action) => {
      const { type } = action.payload

      state.type = type
    })
  }
)

const unsavedTaskInitState = null

export const unsavedTaskReducer = createReducer<null | Task>(
  unsavedTaskInitState,
  (builder) => {
    builder.addCase(updateUnsavedTask, (state, action) => {
      return action.payload
    })
    builder.addCase(updateUnsavedTaskPart, (state, action) => {
      const { key, value } = action.payload

      if (state === null) {
        state = {
          username: '',
          email: '',
          description: '',
          completed: false,
        }
      }

      return {
        ...state,
        [key]: value,
      }
    })
  }
)
