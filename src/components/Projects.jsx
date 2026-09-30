import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CATEGORIAS, PROYECTOS, SIZES_CARD, srcSet, unsplash } from '../data'
import { EASE, viewportOnce } from '../animations'
import { Icono } from './Icons'

const ICONOS_META = [Icono.m2, Icono.habitacion, Icono.cochera]

const MotionCard = motion.article

export default function Projects() {
  const [filtro, setFiltro] = useState('todos')
  const lista = PROYECTOS.filter((p) => filtro === 'todos' || p.cat === filtro)

  return (
    <section className="section section--alt" id="proyectos">
      <div className="wrap">
        <div className="sec-head">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="eyebrow">Portafolio</p>
            <h2 className="h2">Proyectos disponibles</h2>
          </motion.div>

          <div className="filters" role="tablist" aria-label="Filtrar proyectos">
            {CATEGORIAS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={filtro === c.id}
                className={`filter ${filtro === c.id ? 'is-active' : ''}`}
                onClick={() => setFiltro(c.id)}
              >
                {filtro === c.id && (
                  <motion.span
                    className="filter__bg"
                    layoutId="filter-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="filter__txt">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/*
          Cada tarjeta se revela con su propio whileInView + delay por índice, en
          vez de heredar la variante del contenedor. Si el stagger viviera en el
          padre, al cambiar de filtro las tarjetas nuevas montarían con la
          etiqueta "hidden" y el padre ya habría disparado su whileInView
          (once: true) → quedaban en opacity: 0 para siempre.
        */}
        <motion.div className="grid" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {lista.map((p, i) => (
              <MotionCard
                key={p.id}
                layout
                className="pcard"
                initial={{ opacity: 0, y: 26, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: Math.min(i * 0.07, 0.35),
                }}
                whileHover={{ y: -7, transition: { duration: 0.28, ease: EASE } }}
              >
                <div className="pcard__media">
                  <img
                    src={unsplash(p.img, 800)}
                    srcSet={srcSet(p.img, [400, 700, 1100])}
                    sizes={SIZES_CARD}
                    width="800"
                    height="600"
                    alt={`${p.nombre} — ${p.catLabel} en ${p.zona}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <motion.span
                    className="pcard__tag"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                  >
                    {p.catLabel}
                  </motion.span>
                  <span className={`pcard__state st-${p.estado}`}>{p.estadoLabel}</span>
                  <div className="pcard__price">{p.precio}</div>
                  <motion.span
                    className="pcard__overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Ver proyecto
                  </motion.span>
                </div>

                <div className="pcard__body">
                  <div>
                    <h3>{p.nombre}</h3>
                    <p className="pcard__zona">{p.zona}</p>
                  </div>
                  <p className="pcard__desc">{p.desc}</p>
                  <ul className="pcard__meta">
                    {p.meta.map((m, i) => {
                      const Ico = ICONOS_META[i]
                      return (
                        <li key={m}>
                          <Ico />
                          {m}
                        </li>
                      )
                    })}
                  </ul>
                  <div className="pcard__foot">
                    <small>{p.pie}</small>
                    <motion.a
                      className="link-m"
                      href="#contacto"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      Ver detalle <Icono.flecha />
                    </motion.a>
                  </div>
                </div>
              </MotionCard>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {lista.length === 0 && (
            <motion.p
              className="grid__empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              No hay proyectos en esta categoría por el momento.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
