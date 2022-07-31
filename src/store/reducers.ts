import { createReducer } from '@reduxjs/toolkit'
import {
  setIsAdmin,
  addTask,
  removeTask,
  setSort,
  updateUnsavedTask,
} from './actions'
import { Task } from './types'

export const isAdminReducer = createReducer<boolean>(false, (builder) => {
  builder.addCase(setIsAdmin, (state, action) => {
    state = action.payload
  })
})

// @todo remove template tasks
const tasks = [
  {
    id: 1,
    username: 'Bob',
    email: 'abc@example.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    completed: false,
  },
  {
    id: 2,
    username: 'Alice',
    email: 'cba@example.com',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip',
    completed: false,
  },
  {
    id: 3,
    username: 'Bob',
    email: 'abc@example.com',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip consectetur adip',
    completed: true,
  },
  {
    id: 4,
    username: 'Alice',
    email: 'cba@example.com',
    description: 'Lorem ipsum dolor sit amet',
    completed: true,
  },
]

export const taskListReducer = createReducer<Task[]>(tasks, (builder) => {
  builder
    .addCase(addTask, (state, action) => {
      state.push(action.payload)
    })
    .addCase(removeTask, (state, action) => {
      state.filter(({ id }) => id !== action.payload.id)
    })
})

export const sortReducer = createReducer<{ type: string }>(
  { type: '' },
  (builder) => {
    builder.addCase(setSort, (state, action) => {
      const { type } = action.payload

      state.type = type
    })
  }
)

export const unsavedTaskReducer = createReducer<null | Task>(
  null,
  (builder) => {
    builder.addCase(updateUnsavedTask, (state, action) => {
      if (action.payload !== null) {
        const {
          id,
          username,
          email,
          description,
          completed = false,
        } = action.payload

        state = {
          id,
          username,
          email,
          description,
          completed,
        }
      } else {
        state = null
      }
    })
  }
)
