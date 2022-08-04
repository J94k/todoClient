import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './index.css'
import { State } from '../../store/types'
import SortForm from '../../components/SortForm'
import TodoForm from '../../components/TodoForm'
import TaskItem from '../../components/TaskItem'
import Pagination from '../../components/Pagination'

const TASKS_BY_PAGE = 3

const calculatePagesAmount = (listLength: any[]) =>
  listLength.length ? Math.ceil(listLength.length / TASKS_BY_PAGE) : 0

export default function Home() {
  const tasksList = useSelector((state: State) => state.tasks.list)
  const [pagesAmount, setPagesAmount] = useState(
    calculatePagesAmount(tasksList)
  )

  useEffect(() => {
    setPagesAmount(calculatePagesAmount(tasksList))
  }, [tasksList])

  const [currentPage, setCurrentPage] = useState(1)
  const [indexOfFirstTask, setIndexOfFirstTask] = useState(1)
  const [indexOfLastTask, setIndexOfLastTask] = useState(TASKS_BY_PAGE)
  const [renderedTasks, setRenderedTasks] = useState<null | JSX.Element[]>(null)

  useEffect(() => {
    if (pagesAmount === 0) setRenderedTasks(null)
  }, [pagesAmount])

  useEffect(() => {
    const lastTaskNumber = currentPage * TASKS_BY_PAGE

    setIndexOfFirstTask(lastTaskNumber - TASKS_BY_PAGE)
    setIndexOfLastTask(lastTaskNumber)
  }, [currentPage])

  useEffect(() => {
    setRenderedTasks(
      tasksList
        .slice(indexOfFirstTask, indexOfLastTask)
        .map((task) => <TaskItem task={task} key={task.id} />)
    )
  }, [indexOfFirstTask, indexOfLastTask, tasksList])

  return (
    <section className="home">
      <TodoForm />
      <SortForm />

      {renderedTasks?.length ? renderedTasks : <p>No any tasks</p>}

      {pagesAmount > 1 && (
        <Pagination
          pagesAmount={pagesAmount}
          currentPage={currentPage}
          onSelect={setCurrentPage}
        />
      )}
    </section>
  )
}
