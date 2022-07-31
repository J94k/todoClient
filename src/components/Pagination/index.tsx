type OnSelect = (page: number) => void

const returnElements = (amount: number, onSelect: OnSelect) => {
  const elements = []

  for (let n = 1; n <= amount; n++) {
    elements.push(
      <li key={n}>
        <button onClick={() => onSelect(n)}>{n}</button>
      </li>
    )
  }

  return elements
}

export default function Pagination({
  pagesAmount,
  onSelect,
}: {
  pagesAmount: number
  onSelect: OnSelect
}) {
  return (
    <div className="pagination">
      <ul>{returnElements(pagesAmount, onSelect)}</ul>
    </div>
  )
}
