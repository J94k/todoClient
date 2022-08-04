import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Task, Notification, Sort } from './types'
import { ENDPOINT } from '../constants'

export const setIsAdmin = createAction<boolean>('SET_IS_ADMIN')
export const addTask = createAction<Task>('ADD_TASK')
export const removeTask = createAction<{ id: number }>('REMOVE_TASK')
export const setSort = createAction<{ type: Sort }>('SET_SORT')

export const updateUnsavedTask = createAction<null | Task>(
  'UPDATE_UNSAVED_TASK'
)
export const updateUnsavedTaskPart = createAction<{ key: string; value: any }>(
  'UPDATE_UNSAVED_TASK_PART'
)

export const fetchTasks = createAsyncThunk(
  'FETCH_TASKS',
  async (): Promise<Task[] | Error> => {
    try {
      const { data } = await fetch(ENDPOINT.tasks).then((res) => res.json())

      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

export const saveTask = createAsyncThunk(
  'SAVE_TASK',
  async (task: Task): Promise<Task | Error> => {
    try {
      const { data } = await fetch(ENDPOINT.saveTask, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())

      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

export const addNotification = createAction<Notification>('ADD_NOTIFICATION')
export const removeNotification = createAction('REMOVE_NOTIFICATION')
