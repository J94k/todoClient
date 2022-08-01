import { createAction } from '@reduxjs/toolkit'
import { Task } from './types'

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
