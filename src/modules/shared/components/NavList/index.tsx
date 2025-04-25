import { useNavigate } from 'react-router-dom'

export interface INavList {
  title: string
  links: { href: string; name: string }[]
}

export default function NavList({ title, links }: INavList) {
  const navigate = useNavigate()
  const handelLinkClicked = (to?: string) => {
    to && navigate(to)
  }
  return (
    <div className="nav-section">
      <p className="nav-section__title">{title}</p>
      <ul className="nav-section__list">
        {links?.map((link: { href: string; name: string }, index) => (
          <li
            key={`nav-${link.name}-${index}`} // Clé unique ajoutée
            className="nav-section__list-navlink"
          >
            <p
              className={`navlink ${!link.href ? ' navlink--active' : ''}`}
              onClick={() => handelLinkClicked(link.href)}
            >
              {link.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
