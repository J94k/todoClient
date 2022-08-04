import { useEffect } from 'react'
import { JTW_STORAGE_KEY, ENDPOINT } from '../../constants'
import { useAppDispatch } from '../../hooks'
import { setIsLoggedIn, fetchTasks } from '../../store/actions'

export default function Bootstrap() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const tryToLogin = async () => {
      try {
        const token = localStorage.getItem(JTW_STORAGE_KEY)

        if (!token) return

        const response = await fetch(ENDPOINT.auth, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json())

        if (response?.success) dispatch(setIsLoggedIn(true))
      } catch (error) {
        console.error(error)
      }
    }

    tryToLogin()
  })

  useEffect(() => {
    dispatch(fetchTasks())
  })

  return null
}
