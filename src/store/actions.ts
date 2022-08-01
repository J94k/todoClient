import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Task, Notification } from './types'

export const setIsAdmin = createAction<boolean>('SET_IS_ADMIN')
export const addTask = createAction<Task>('ADD_TASK')
export const removeTask = createAction<{ id: number }>('REMOVE_TASK')
export const setSort = createAction<{ type: string }>('SET_SORT')
export const updateUnsavedTask = createAction<null | Task>(
  'UPDATE_UNSAVED_TASK'
)
export const updateUnsavedTaskPart = createAction<{ key: string; value: any }>(
  'UPDATE_UNSAVED_TASK_PART'
)
export const saveTask = createAsyncThunk(
  'SAVE_TASK',
  async (task: Task): Promise<Task | Error> => {
    try {
      // @todo replace with a real API call
      await new Promise((resolve) => setTimeout(() => resolve(true), 1_000))

      return task
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)
export const addNotification = createAction<Notification>('ADD_NOTIFICATION')
export const removeNotification = createAction('REMOVE_NOTIFICATION')
