import { BaseSyntheticEvent, useState } from 'react'
import './index.css'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  updateUnsavedTaskPart,
  saveTask,
  addNotification,
} from '../../store/actions'
import { State } from '../../store/types'
import Accordion from '../Accordion'
import { isTaskDataValid, preventReload } from '../../utils'

export default function TodoForm() {
  const dispatch = useAppDispatch()
  const newNotificationId = useAppSelector(
    (state: State) => state.notifications.length
  )
  const unsavedTask = useAppSelector((state: State) => state.tasks.unsaved)
  const [isValidData, setIsValidData] = useState(true)

  const dropValidationNotice = () => setIsValidData(true)

  const onUsernameChange = (event: BaseSyntheticEvent) => {
    dispatch(
      updateUnsavedTaskPart({
        key: 'name',
        value: event.target.value,
      })
    )
  }

  const onEmailChange = (event: BaseSyntheticEvent) => {
    dispatch(
      updateUnsavedTaskPart({
        key: 'email',
        value: event.target.value,
      })
    )
  }

  const onDescriptionChange = (event: BaseSyntheticEvent) => {
    dispatch(
      updateUnsavedTaskPart({
        key: 'description',
        value: encodeURIComponent(event.target.value),
      })
    )
  }

  const onSave = async () => {
    if (!unsavedTask || !isTaskDataValid(unsavedTask)) {
      return setIsValidData(false)
    }

    dispatch(
      saveTask({
        ...unsavedTask,
        done: false,
      })
    ).then((data: any) => {
      const notification = { title: '', description: '' }

      if (data.error) {
        notification.title = data.error.name
        notification.description = data.error.message
      } else {
        notification.title = 'Task was saved'
      }

      dispatch(
        addNotification({
          id: newNotificationId,
          title: notification.title,
          description: notification.description,
        })
      )
    })
  }

  return (
    <div className="todo-container">
      <Accordion title={<h4 className="todo-container__title">New task</h4>}>
        <form
          className="todo-container__form"
          onSubmit={preventReload}
          onChange={dropValidationNotice}
        >
          <input
            className="todo-container__field"
            onChange={onUsernameChange}
            type="text"
            defaultValue={unsavedTask?.name}
            placeholder="username"
            required
          />
          <input
            className="todo-container__field"
            onChange={onEmailChange}
            type="email"
            defaultValue={unsavedTask?.email}
            placeholder="email"
            required
          />
          <textarea
            className="todo-container__field todo-container__description"
            onChange={onDescriptionChange}
            defaultValue={unsavedTask?.description}
            placeholder="description"
            required
          />

          {!isValidData && (
            <p className="todo-container__notice">Invalid form data</p>
          )}

          <button
            className="todo-container__save-button"
            type="submit"
            onClick={onSave}
          >
            Save
          </button>
        </form>
      </Accordion>
    </div>
  )
}
