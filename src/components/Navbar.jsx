import { motion } from 'framer-motion'
import { CONTACTO, NAV } from '../data'
import { EASE } from '../animations'

export default function Navbar() {
  return (
    <motion.header
      className="nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
    >
      <div className="wrap nav__inner">
        <motion.a
          href="#top"
          className="logo"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.span
            className="logo__mark"
            whileHover={{ rotate: -8, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
          >
            A
          </motion.span>
          <span className="logo__text">
            ATESSA
            <em>desarrollos</em>
          </span>
        </motion.a>

        <nav className="nav__links" id="navLinks">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="nav__link">
              {item.label}
            </a>
          ))}
          <motion.a
            href="#contacto"
            className="btn btn--sm btn--primary nav__cta"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            Agendar visita
          </motion.a>
        </nav>

        <div className="nav__right">
          <a className="nav__tel" href={CONTACTO.telHref}>
            {CONTACTO.tel}
          </a>
          <button
            className="nav__toggle"
            id="navToggle"
            aria-label="Abrir menú"
            aria-expanded="false"
            aria-controls="navLinks"
            onClick={(e) => {
              const links = document.getElementById('navLinks')
              const btn = e.currentTarget
              const open = links.classList.toggle('is-open')
              btn.setAttribute('aria-expanded', String(open))
            }}
          >
            <motion.span animate={{ rotate: 0 }} />
            <span />
            <span />
          </button>
        </div>
      </div>
    </motion.header>
  )
}
