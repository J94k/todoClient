import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeNotification } from '../../store/actions'
import './index.css'

export default function Notification({
  delay,
  title,
  description,
}: {
  delay: number
  title: string
  description?: string
}) {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false)
      dispatch(removeNotification())
    }, delay)

    return () => clearTimeout(timeoutId)
  })

  return (
    <div className={`notification  ${isVisible ? 'visible' : ''}`}>
      <h3 className="notification__title">{title}</h3>
      {description && (
        <p className="notification__description">{description}</p>
      )}
    </div>
  )
}
