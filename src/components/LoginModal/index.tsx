import { BaseSyntheticEvent, useState } from 'react'
import './index.css'
import Modal from '../Modal'
import { State } from '../../store/types'
import { updateLoginFormPart, logIn } from '../../store/actions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { isValidLoginFormData, preventReload } from '../../utils'

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [errorNotice, setErrorNotice] = useState('')

  const dropNotice = () => setErrorNotice('')

  const loginForm = useAppSelector((state: State) => state.loginForm)
  const dispatch = useAppDispatch()

  const onUsernameChange = (event: BaseSyntheticEvent) => {
    dispatch(
      updateLoginFormPart({
        key: 'username',
        value: event.target.value,
      })
    )
  }

  const onPasswordChange = (event: BaseSyntheticEvent) => {
    dispatch(
      updateLoginFormPart({
        key: 'password',
        value: event.target.value,
      })
    )
  }

  const onSubmit = async () => {
    if (!isValidLoginFormData(loginForm))
      return setErrorNotice('Invalid input data')

    dispatch(logIn(loginForm)).then(({ payload }) => {
      if (!payload.success) {
        return setErrorNotice('Wrong credentials')
      }
    })
  }

  return (
    <Modal>
      <div className="login-modal__container">
        <div className="login-modal__header">
          <h3 className="login-modal__title">Login</h3>
          <button onClick={onClose}>Close</button>
        </div>

        <form
          className="login-modal__form"
          onSubmit={preventReload}
          onChange={dropNotice}
        >
          <input
            className="login-modal__input"
            type="text"
            placeholder="Username"
            defaultValue={loginForm.username}
            onChange={onUsernameChange}
            required
          />
          <input
            className="login-modal__input"
            type="password"
            placeholder="Password"
            defaultValue={loginForm.password}
            onChange={onPasswordChange}
            required
          />
          {errorNotice && <p className="login-modal__notice">{errorNotice}</p>}

          <button type="submit" onClick={onSubmit}>
            Sign in
          </button>
        </form>
      </div>
    </Modal>
  )
}
