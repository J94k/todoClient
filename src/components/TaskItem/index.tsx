import './index.css'
import { Task } from '../../store/types'

export default function TaskItem({ task }: { task: Task }) {
  const { name, email, description, done } = task

  return (
    <div className={`task-item ${done ? 'done' : ''}`}>
      <div className="task-item__author">
        <b className="task-item__authors-name">{name}:</b>
        <span className="task-item__authors-email">{email}</span>
      </div>
      <p className="task-item__description">{description}</p>
    </div>
  )
}
