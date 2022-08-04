import { useState } from 'react'
import './index.css'
import LoginModal from '../LoginModal'

export default function Header() {
  const [displayModal, setDisplayModal] = useState(false)

  const openLoginModal = () => setDisplayModal(true)
  const closeLoginModal = () => setDisplayModal(false)

  return (
    <header className="header">
      {displayModal && <LoginModal onClose={closeLoginModal} />}

      <h1 className="header__title">TODO app</h1>
      <button onClick={openLoginModal} className="header__login-button">
        Login
      </button>
    </header>
  )
}
