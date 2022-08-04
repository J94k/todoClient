import './index.css'
import { Task } from '../../store/types'

export default function TaskItem({ task }: { task: Task }) {
  const { name, email, description, done, edited } = task

  const labels = [
    {
      name: 'Edited by admin',
      active: edited,
      className: 'edited',
    },
    {
      name: 'Done',
      active: done,
      className: 'done',
    },
  ]

  return (
    <div className="task-item">
      <div className="task-item__author">
        <span className="task-item__authors-name">{name}:</span>
        <span className="task-item__authors-email">{email}</span>
      </div>
      <p className="task-item__description">
        {decodeURIComponent(description)}
      </p>

      {!!labels.length && (
        <>
          <hr className="task-item__separator" />
          <div className="task-item__labels">
            {labels.map(({ name, active, className }, index) =>
              active ? (
                <span className={`task-item__label ${className}`} key={index}>
                  {name}
                </span>
              ) : null
            )}
          </div>
        </>
      )}
    </div>
  )
}
