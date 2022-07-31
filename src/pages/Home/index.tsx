import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../store/types'
import SortForm from '../../components/SortForm'
import TodoForm from '../../components/TodoForm'
import TaskItem from '../../components/TaskItem'
import Pagination from '../../components/Pagination'

const TASKS_BY_PAGE = 3

export default function Home() {
  const taskList = useSelector((state: State) => state.taskList)
  const [pagesAmount] = useState(
    taskList.length ? Math.ceil(taskList.length / TASKS_BY_PAGE) : 0
  )
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
      taskList
        .slice(indexOfFirstTask, indexOfLastTask)
        .map((task) => <TaskItem task={task} key={task.id} />)
    )
  }, [indexOfFirstTask, indexOfLastTask, taskList])

  return (
    <section className="home">
      <SortForm />
      <TodoForm />

      {renderedTasks || <p>No any tasks</p>}

      {pagesAmount > 1 && (
        <Pagination pagesAmount={pagesAmount} onSelect={setCurrentPage} />
      )}
    </section>
  )
}
