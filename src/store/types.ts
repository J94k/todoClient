export interface Task {
  id: number
  username: string
  email: string
  description: string
  completed: boolean
}

export interface State {
  isAdmin: boolean
  sort: { type: string }
  unsavedTask: null | Task
  taskList: Task[]
}
