import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CONTACTO, NAV } from '../data'
import { EASE } from '../animations'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    const onKey = (e) => e.key === 'Escape' && close()
    const mq = window.matchMedia('(min-width: 861px)')
    const onDesktop = () => mq.matches && close()
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onDesktop)
    document.body.classList.add('nav-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onDesktop)
      document.body.classList.remove('nav-open')
    }
  }, [open])

  return (
    <>
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
            onClick={() => setOpen(false)}
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

          <nav
            className={`nav__links${open ? ' is-open' : ''}`}
            id="navLinks"
            onClick={() => setOpen(false)}
          >
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
          
            <button
              className={`nav__toggle${open ? ' is-open' : ''}`}
              id="navToggle"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={String(open)}
              aria-controls="navLinks"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="nav__bar" />
              <span className="nav__bar" />
              <span className="nav__bar" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}