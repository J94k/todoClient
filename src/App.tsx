import React from 'react'
import { useSelector } from 'react-redux'
import './app.css'
import { State, Notification as NotificationInterface } from './store/types'
import Notification from './components/Notification'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  const notifications = useSelector((state: State) => state.notifications)

  return (
    <div className="app">
      {!!notifications.length &&
        notifications.map(
          ({ title, description }: NotificationInterface, i: number) => (
            <Notification
              delay={3_000}
              title={title}
              description={description}
              key={i}
            />
          )
        )}

      <Header />

      <main className="app__main">
        <Home />
      </main>

      <Footer />
    </div>
  )
}
