import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { PILLARS, unsplash } from '../data'
import {
  EASE,
  listChild,
  listParent,
  slideLeft,
  slideRight,
  viewportSoft,
} from '../animations'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const yImg1 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yImg2 = useTransform(scrollYProgress, [0, 1], [80, -20])
  const yBadge = useTransform(scrollYProgress, [0, 1], [10, 70])

  return (
    <section className="section" id="nosotros" ref={ref}>
      <div className="wrap about">
        <motion.div
          className="about__media"
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
        >
          <motion.img
            className="about__img"
            style={{ y: yImg1 }}
            src={unsplash('1600585154340-be6161a56a0c', 900)}
            alt="Arquitecto revisando planos de una obra de ATESSA"
            loading="lazy"
          />
          <motion.img
            className="about__img about__img--2"
            style={{ y: yImg2 }}
            src={unsplash('1502672260266-1c1ef2d93688', 600)}
            alt="Interior de una vivienda entregada por ATESSA"
            loading="lazy"
          />
          <motion.div className="about__badge" style={{ y: yBadge }}>
            <strong>+20</strong>
            <span>
              años construyendo
              <br />
              en Salta
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="about__text"
          variants={slideRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
        >
          <p className="eyebrow">Quiénes somos</p>
          <h2 className="h2">De agencia inmobiliaria a desarrolladora</h2>
          <p>
            <strong>ATESSA</strong> nació en <strong>2003</strong> como agencia
            inmobiliaria. A lo largo de estos años entendimos algo: nuestros clientes no
            buscaban solamente un lugar, buscaban certeza. Por eso en{' '}
            <strong>2012</strong> mutamos hacia el desarrollo integral.
          </p>
          <p>
            Hoy operamos en toda la provincia de Salta: centro, barrios consolidados,
            corredor Norte y la zona de El Carril. Combinamos la mirada de quien conoce
            la ciudad con la capacidad técnica de construir.
          </p>

          <motion.blockquote
            className="mission"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <p>
              “Nuestra misión es servir con <strong>profesionalismo, ética y eficiencia</strong>{' '}
              a nuestros clientes, consolidando nuestro liderazgo en el negocio
              inmobiliario.”
            </p>
          </motion.blockquote>

          <motion.div
            className="pillars"
            variants={listParent(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {PILLARS.map((p) => (
              <motion.div
                key={p.n}
                className="pillar"
                variants={listChild}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.25 }}
              >
                <h3>
                  {p.n} · {p.t}
                </h3>
                <p>{p.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
