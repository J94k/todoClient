import './index.css'

export default function Footer() {
  const copyright = `Copyright © ${new Date().getFullYear()} TODO bicycle`

  return (
    <footer className="footer">
      <span className="footer__copyright">{copyright}</span>
    </footer>
  )
}
