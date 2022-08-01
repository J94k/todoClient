import { BaseSyntheticEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './index.css'
import {
  updateUnsavedTaskPart,
  saveTask,
  addNotification,
} from '../../store/actions'
import { State } from '../../store/types'
import Accordion from '../Accordion'
import { isTaskDataValid } from '../../utils'

const preventReload = (event: BaseSyntheticEvent) => event.preventDefault()

export default function TodoForm() {
  const dispatch = useDispatch()
  const notifications = useSelector((state: State) => state.notifications)
  const unsavedTask = useSelector((state: State) => state.tasks.unsaved)
  const [isValidData, setIsValidData] = useState(true)

  const dropValidationNotice = () => setIsValidData(true)

  const onUsernameChange = (event: BaseSyntheticEvent) => {
    dispatch(
      updateUnsavedTaskPart({
        key: 'username',
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
        value: event.target.value,
      })
    )
  }

  const onSave = async () => {
    if (!unsavedTask || !isTaskDataValid(unsavedTask)) {
      return setIsValidData(false)
    }

    //@remind after complete a server side remove id from this place
    dispatch(
      // @ts-ignore @audit-issue
      saveTask({
        ...unsavedTask,
        completed: false,
        id: Math.floor(Math.random() * 1_000_000_000),
      })
    ).then((data: any) => {
      console.log('🚀 ~ file: index.tsx ~ line 64 ~ ).then ~ data', data)
      if (data.error) {
        dispatch(
          addNotification({
            id: notifications.length,
            title: data.error.name,
            description: data.error.message,
          })
        )
      } else {
        dispatch(
          addNotification({
            id: notifications.length,
            title: 'Task was saved',
          })
        )
      }
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
            defaultValue={unsavedTask?.username}
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
