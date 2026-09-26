import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { INVERSION, unsplash } from '../data'
import { EASE, listChild, listParent, viewportOnce } from '../animations'

export default function Investment() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1])

  return (
    <section className="inv" id="inversion" ref={ref}>
      <div className="inv__media">
        <motion.img
          src={unsplash('1512917774080-9991f1c4c750', 1400)}
          alt="Edificio residencial moderno de ATESSA"
          style={{ x, scale }}
          loading="lazy"
        />
      </div>

      <motion.div
        className="inv__body"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <p className="eyebrow eyebrow--light">Inversión</p>
        <h2 className="h2 h2--light">
          Salta recibe inversión
          <br />
          de todo el NOA y el mundo
        </h2>
        <p className="inv__lead">
          Minería, turismo y agro están empujando la demanda. La provincia crece a un
          ritmo que la oferta de vivienda y de espacios comerciales no acompaña. Para el
          inversor que llega antes, la diferencia es de 40 a 60 puntos de rentabilidad.
        </p>

        <motion.ul
          className="inv__list"
          variants={listParent(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {INVERSION.map((i) => (
            <motion.li
              key={i.k}
              variants={listChild}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.25 }}
            >
              <span>{i.k}</span>
              <strong>{i.v}</strong>
            </motion.li>
          ))}
        </motion.ul>

        <motion.a
          href="#contacto"
          className="btn btn--light"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          Recibir el informe de inversión
        </motion.a>
      </motion.div>
    </section>
  )
}
