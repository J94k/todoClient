import {
  EMAIL_REGEXP,
  USERNAME_REGEXP,
  TASK_DESCRIPTION_REGEXP,
} from '../constants'

export function isTaskDataValid({
  username,
  email,
  description,
}: {
  username: string
  email: string
  description: string
}) {
  return Boolean(
    username.match(USERNAME_REGEXP) &&
      email.match(EMAIL_REGEXP) &&
      description.match(TASK_DESCRIPTION_REGEXP)
  )
}
