import { Task } from '../../store/types'

export default function TaskItem({ task }: { task: Task }) {
  const { username, email, description, completed } = task

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <p className="task-item__author">
        <span>{username}</span>
        <span>{email}</span>
      </p>
      <p className="task-item__description">{description}</p>
    </div>
  )
}
