import { useEffect } from 'react'
import { useAppDispatch } from '../../hooks'
import { fetchTasks } from '../../store/actions'

export default function Bootstrap() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  })

  return null
}
