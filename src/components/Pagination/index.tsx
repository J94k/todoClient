import './index.css'

type OnSelect = (page: number) => void

const returnElements = (
  amount: number,
  currentPage: number,
  onSelect: OnSelect
) => {
  const elements = []

  for (let n = 1; n <= amount; n++) {
    elements.push(
      <li
        className={`pagination__item ${n === currentPage ? 'active' : ''}`}
        key={n}
      >
        <button onClick={() => onSelect(n)}>{n}</button>
      </li>
    )
  }

  return elements
}

export default function Pagination({
  pagesAmount,
  currentPage,
  onSelect,
}: {
  pagesAmount: number
  currentPage: number
  onSelect: OnSelect
}) {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {returnElements(pagesAmount, currentPage, onSelect)}
      </ul>
    </div>
  )
}
