import { motion } from 'framer-motion'
import { TESTIMONIOS } from '../data'
import { EASE, listChild, listParent, viewportOnce } from '../animations'

export default function Testimonials() {
  return (
    <section className="section">
      <div className="wrap">
        <motion.header
          className="sec-head sec-head--center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <p className="eyebrow">Testimonios</p>
          <h2 className="h2">Lo que dicen nuestros clientes</h2>
        </motion.header>

        <motion.div
          className="quotes"
          variants={listParent(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {TESTIMONIOS.map((t) => (
            <motion.figure
              key={t.n}
              className={`quote ${t.accent ? 'quote--accent' : ''}`}
              variants={listChild}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            >
              <motion.span
                className="quote__mark"
                initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
                aria-hidden="true"
              >
                &ldquo;
              </motion.span>
              <blockquote>{t.t}</blockquote>
              <figcaption>
                <strong>{t.n}</strong>
                <span>{t.r}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
