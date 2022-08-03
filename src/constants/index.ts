export const EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
export const USERNAME_REGEXP = /^[\w\d]+$/gi
export const TASK_DESCRIPTION_REGEXP = /^[\w\d ]+$/gi

const { REACT_APP_API_ENDPOINT } = process.env

export const ENDPOINT = {
  login: `${REACT_APP_API_ENDPOINT}/users/login`,
  tasks: `${REACT_APP_API_ENDPOINT}/tasks/all`,
  saveTask: `${REACT_APP_API_ENDPOINT}/tasks/new`,
  updateTask: `${REACT_APP_API_ENDPOINT}/tasks/`,
  deleteTask: `${REACT_APP_API_ENDPOINT}/tasks/`,
}