import React from 'react'
import './app.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Home />
      </main>

      <Footer />
    </div>
  )
}
