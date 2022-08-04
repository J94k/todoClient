import { BaseSyntheticEvent, useState, useEffect } from 'react'
import './index.css'
import { Task, State } from '../../store/types'
import { addNotification, updateTask } from '../../store/actions'
import { useAppDispatch, useAppSelector } from '../../hooks'

export default function TaskItem({
  task,
  allowChanges,
}: {
  task: Task
  allowChanges: boolean
}) {
  const newNotificationId = useAppSelector(
    (state: State) => state.notifications.length
  )
  const dispatch = useAppDispatch()
  const { name, email, edited, description, done } = task

  const [newDescription, setNewDescription] = useState(description)
  const [newStatus] = useState(done)

  const onDescriptionChange = (event: BaseSyntheticEvent) =>
    setNewDescription(event.target.value)

  const [dataIsChanged, setDataIsChanged] = useState(false)

  useEffect(() => {
    setDataIsChanged(
      JSON.stringify({
        description: newDescription,
        done: newStatus,
      }) !==
        JSON.stringify({
          description,
          done,
        })
    )
  }, [description, done, newDescription, newStatus])

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

  const onTaskUpdate = () => {
    if (!dataIsChanged) return

    dispatch(
      updateTask({ ...task, description: newDescription, done: newStatus })
    ).then(() => {
      dispatch(
        addNotification({
          id: newNotificationId,
          title: 'Task was updated',
        })
      )
    })
  }

  return (
    <div className="task-item">
      <div className="task-item__author">
        <span className="task-item__authors-name">{name}:</span>
        <span className="task-item__authors-email">{email}</span>
      </div>
      {allowChanges ? (
        <textarea
          className="task-item__changable-description"
          onChange={onDescriptionChange}
          defaultValue={decodeURIComponent(newDescription)}
        />
      ) : (
        <p className="task-item__description">
          {decodeURIComponent(description)}
        </p>
      )}

      <div className="task-item__labels">
        {labels.map(({ name, active, className }, index) =>
          active ? (
            <span className={`task-item__label ${className}`} key={index}>
              {name}
            </span>
          ) : null
        )}
      </div>

      {allowChanges && (
        <>
          <button onClick={onTaskUpdate} disabled={!dataIsChanged}>
            {dataIsChanged ? 'Update' : 'Nothing to update'}
          </button>
        </>
      )}
    </div>
  )
}
