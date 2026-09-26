import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { CONTACTO, HERO_STATS } from '../data'
import { EASE, fadeUp, listChild, listParent } from '../animations'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.16])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(4px)'])

  return (
    <section className="hero" ref={ref} id="top">
      <motion.div
        className="hero__bg"
        style={{ y, scale, filter: blur }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      />

      <motion.div className="wrap hero__content" style={{ opacity }}>
        <motion.p
          className="eyebrow eyebrow--light"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.15 }}
        >
          Desarrolladora inmobiliaria · Salta
        </motion.p>

        <motion.h1
          className="hero__title"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.28 }}
        >
          Construimos
          <br />
          <motion.span
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
          >
            lugares para vivir
          </motion.span>
        </motion.h1>

        <motion.p
          className="hero__lead"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.45 }}
        >
          <strong>ATESSA</strong> acompaña a familias, inversores y empresas en Salta.
          Empezamos como agencia inmobiliaria y hoy somos una desarrolladora: diseñamos,
          construimos y entregamos espacios pensados para durar.
        </motion.p>

        <motion.div
          className="hero__actions"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="#proyectos"
            className="btn btn--primary"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Ver proyectos
          </motion.a>
          <motion.a
            href="#contacto"
            className="btn btn--ghost"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Hablar con un asesor
          </motion.a>
        </motion.div>

        <motion.ul
          className="hero__stats"
          variants={listParent(0.11, 0.75)}
          initial="hidden"
          animate="show"
        >
          {HERO_STATS.map((s) => (
            <motion.li key={s.l} variants={listChild}>
              <motion.strong
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {s.n}
              </motion.strong>
              <span>{s.l}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.a
        className="hero__scroll"
        href="#nosotros"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        whileHover={{ x: 4 }}
      >
        <span />
        Deslizá
      </motion.a>

      <motion.div
        className="hero__side"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
        style={{ opacity }}
      >
        <span className="hero__side-label">Llamanos</span>
        <a href={CONTACTO.telHref}>{CONTACTO.tel}</a>
      </motion.div>
    </section>
  )
}
