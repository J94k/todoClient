import { useState } from 'react'
import './index.css'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { State } from '../../store/types'
import { setIsLoggedIn } from '../../store/actions'
import { JTW_STORAGE_KEY } from '../../constants'
import LoginModal from '../LoginModal'

export default function Header() {
  const dispatch = useAppDispatch()
  const userIsLoggedIn = useAppSelector((state: State) => state.userIsLoggedIn)
  const [displayModal, setDisplayModal] = useState(false)

  const openLoginModal = () => setDisplayModal(true)
  const closeLoginModal = () => setDisplayModal(false)

  const onSignOut = () => {
    localStorage.removeItem(JTW_STORAGE_KEY)
    dispatch(setIsLoggedIn(false))
  }

  return (
    <header className="header">
      {displayModal && <LoginModal onClose={closeLoginModal} />}

      <h1 className="header__title">TODO app</h1>

      {userIsLoggedIn ? (
        <button onClick={onSignOut} className="header__account-button">
          Sign out
        </button>
      ) : (
        <button onClick={openLoginModal} className="header__account-button">
          Login
        </button>
      )}
    </header>
  )
}
