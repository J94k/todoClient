import './index.css'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Sort, State } from '../../store/types'
import { setSort } from '../../store/actions'

const sortItems = [
  { title: 'Name', types: [Sort.nameStart, Sort.nameEnd] },
  { title: 'Email', types: [Sort.emailStart, Sort.emailEnd] },
  { title: 'Status', types: [Sort.statusStart, Sort.statusEnd] },
]

export default function SortForm() {
  const dispatch = useAppDispatch()
  const sort = useAppSelector((state: State) => state.tasks.sort)

  const onSortChange = (types: Sort[]) => {
    dispatch(setSort({ type: sort === types[0] ? types[1] : types[0] }))
  }

  return (
    <div className="sorting-form">
      {sortItems.map(({ title, types }, index) => {
        return (
          <button
            key={index}
            title={title}
            onClick={() => onSortChange(types)}
            className={`${types.includes(sort) ? 'active' : ''}`}
          >
            {title} {sort === types[0] ? '▼' : '▲'}
          </button>
        )
      })}
    </div>
  )
}
