import './index.css'
import { Task } from '../../store/types'

export default function TaskItem({ task }: { task: Task }) {
  const { username, email, description, completed } = task

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <div className="task-item__author">
        <b className="task-item__authors-name">{username}:</b>
        <span className="task-item__authors-email">{email}</span>
      </div>
      <p className="task-item__description">{description}</p>
    </div>
  )
}
