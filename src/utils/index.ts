import { BaseSyntheticEvent } from 'react'
import {
  EMAIL_REGEXP,
  USERNAME_REGEXP,
  TASK_DESCRIPTION_REGEXP,
  PASSWORD_REGEXP,
} from '../constants'
import { Sort } from '../store/types'

export function preventReload(event: BaseSyntheticEvent) {
  event.preventDefault()
}

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

export function sortByType(arr: any[], type: Sort) {
  const resultArr = [...arr]

  switch (type) {
    case Sort.nameStart:
      resultArr.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      )
      break
    case Sort.nameEnd:
      resultArr.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
      )
      break
    case Sort.emailStart:
      resultArr.sort((a, b) =>
        a.email.toLowerCase() < b.email.toLowerCase() ? -1 : 1
      )
      break
    case Sort.emailEnd:
      resultArr.sort((a, b) =>
        a.email.toLowerCase() < b.email.toLowerCase() ? 1 : -1
      )
      break
    case Sort.statusStart:
      resultArr.sort((a, b) => (b.done ? 1 : -1))
      break
    case Sort.statusEnd:
      resultArr.sort((a, b) => (b.done ? -1 : 1))
      break
  }

  return resultArr
}

export async function stringToSha512(str: string) {
  try {
    return crypto.subtle
      .digest('SHA-512', new TextEncoder().encode(str))
      .then((buf) =>
        Array.prototype.map
          .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
          .join('')
      )
  } catch (error) {
    console.error(error)
    return ''
  }
}

export function isValidLoginFormData({
  username,
  password,
}: {
  username: string
  password: string
}) {
  return Boolean(
    username.match(USERNAME_REGEXP) && password.match(PASSWORD_REGEXP)
  )
}
