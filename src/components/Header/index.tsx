import './index.css'

export default function Header() {
  const openLoginModal = () => {}

  return (
    <header className="header">
      <h1 className="header__title">TODO app</h1>
      <button onClick={openLoginModal} className="header__login-button">
        Login
      </button>
    </header>
  )
}
