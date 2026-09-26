import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CONTACTO } from '../data'
import { EASE } from '../animations'
import { Icono } from './Icons'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          className="wa"
          href={CONTACTO.waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          initial={{ opacity: 0, scale: 0.4, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 24 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 380, damping: 20 }}
        >
          <motion.span
            className="wa__pulse"
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: EASE }}
          />
          <Icono.whatsapp />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
