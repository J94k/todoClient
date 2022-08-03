export interface Task {
  id?: number
  client_id?: number
  description: string
  done: false
  name: string
  email: string
}

export interface TaskList {
  unsaved: null | Task
  list: Task[]
}

export interface Notification {
  id: number
  title: string
  description?: string
}

export interface State {
  isAdmin: boolean
  sort: { type: string }
  tasks: TaskList
  notifications: Notification[]
}
