export interface Task {
  id?: number
  client_id?: number
  description: string
  name: string
  email: string
  done: boolean
  edited: boolean
}

export enum Sort {
  idStart,
  idEnd,
  nameStart,
  nameEnd,
  emailStart,
  emailEnd,
  statusStart,
  statusEnd,
}

export interface TaskList {
  unsaved: null | Task
  list: Task[]
  sort: Sort
}

export interface Notification {
  id: number
  title: string
  description?: string
}

export interface LoginForm {
  username: string
  password: string
}

export interface State {
  userIsLoggedIn: boolean
  loginForm: LoginForm
  tasks: TaskList
  notifications: Notification[]
}
