import './index.css'

export default function Modal({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string
}) {
  return (
    <div className="modal-wrapper">
      <div className="modal">{children}</div>
    </div>
  )
}
