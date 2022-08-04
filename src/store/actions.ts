import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Task, Notification, Sort, LoginForm } from './types'
import { ENDPOINT, JTW_STORAGE_KEY } from '../constants'
import { stringToSha512 } from '../utils'

export const setIsLoggedIn = createAction<boolean>('SET_IS_LOGGED_IN')
export const updateLoginFormPart = createAction<{ key: string; value: any }>(
  'UPDATE_LOGIN_FORM_PART'
)
export const logIn = createAsyncThunk(
  'LOG_IN',
  async ({ username, password }: LoginForm) => {
    try {
      const hash = await stringToSha512(password)
      const { data } = await fetch(ENDPOINT.login, {
        method: 'POST',
        body: JSON.stringify({
          username,
          hash,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())

      if (data.success && data.token) {
        localStorage.setItem(JTW_STORAGE_KEY, data.token)
      }

      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

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

export const updateTask = createAsyncThunk(
  'UPDATE_TASK',
  async (task: Task): Promise<Task | Error> => {
    try {
      const token = localStorage.getItem(JTW_STORAGE_KEY)

      if (!token) throw new Error('Does not have JWT token')

      const { data } = await fetch(`${ENDPOINT.updateTask}/${task.id}`, {
        method: 'PATCH',
        body: JSON.stringify(task),
        headers: {
          Authorization: `Bearer ${token}`,
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
