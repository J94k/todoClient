import {} from '@reduxjs/toolkit'
import {
  EMAIL_REGEXP,
  USERNAME_REGEXP,
  TASK_DESCRIPTION_REGEXP,
} from '../constants'

export function isTaskDataValid({
  name,
  email,
  description,
}: {
  name: string
  email: string
  description: string
}) {
  return Boolean(
    name.match(USERNAME_REGEXP) &&
      email.match(EMAIL_REGEXP) &&
      description.match(TASK_DESCRIPTION_REGEXP)
  )
}
