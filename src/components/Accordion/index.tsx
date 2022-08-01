import { useState } from 'react'
import './index.css'

export default function Accordion({
  title,
  children,
}: {
  title: JSX.Element
  children: JSX.Element | JSX.Element[]
}) {
  const [opened, setOpened] = useState(false)

  const toggleVisibility = () => setOpened((prevState) => !prevState)

  return (
    <div className="accordion">
      <div className="accordion__header" onClick={toggleVisibility}>
        {title}
        <span className={`accordion__arrow ${opened ? 'opened' : ''}`}></span>
      </div>
      {opened && children}
    </div>
  )
}
