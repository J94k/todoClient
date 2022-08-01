export interface Task {
  id?: number
  username: string
  email: string
  description: string
  completed: boolean
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
