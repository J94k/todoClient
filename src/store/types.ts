export interface Task {
  id?: number
  client_id?: number
  description: string
  done: false
  name: string
  email: string
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

export interface State {
  isAdmin: boolean
  tasks: TaskList
  notifications: Notification[]
}
