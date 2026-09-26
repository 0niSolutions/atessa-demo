import { motion } from 'framer-motion'
import { SERVICIOS } from '../data'
import { EASE, listChild, listParent, viewportOnce } from '../animations'

export default function Services() {
  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <motion.header
          className="sec-head sec-head--center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <p className="eyebrow">Qué hacemos</p>
          <h2 className="h2">Un solo interlocutor, todo el proceso</h2>
          <p className="sec-head__sub">
            Desde la primera visita al terreno hasta la escritura y la entrega de las
            llaves, con seguimiento permanente.
          </p>
        </motion.header>

        <motion.div
          className="cards"
          variants={listParent(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {SERVICIOS.map((s) => (
            <motion.article
              key={s.n}
              className="card-svc"
              variants={listChild}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <motion.span
                className="card-svc__num"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {s.n}
              </motion.span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <motion.span
                className="card-svc__line"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
