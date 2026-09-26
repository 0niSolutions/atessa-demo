import { motion } from 'framer-motion'
import { CONTACTO, IG_FOTOS, unsplash } from '../data'
import { EASE, listParent, viewportOnce } from '../animations'
import { Icono } from './Icons'

export default function Instagram() {
  return (
    <section className="section section--alt" id="instagram">
      <div className="wrap">
        <motion.header
          className="sec-head sec-head--center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <p className="eyebrow">Seguinos</p>
          <h2 className="h2">{CONTACTO.instagramUser}</h2>
          <p className="sec-head__sub">
            Avances de obra, tipologías entregadas y oportunidades que publicamos primero
            en Instagram.
          </p>
        </motion.header>

        <motion.div
          className="ig-grid"
          variants={listParent(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {IG_FOTOS.map((id) => (
            <motion.a
              key={id}
              className="ig"
              href={CONTACTO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              variants={{
                hidden: { opacity: 0, y: 22, scale: 0.95 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: EASE },
                },
                hover: { y: -4, transition: { duration: 0.25, ease: EASE } },
              }}
            >
              <motion.img
                src={unsplash(id, 500)}
                alt={`Publicación de ${CONTACTO.instagramUser}`}
                loading="lazy"
                variants={{ hover: { scale: 1.1 } }}
                transition={{ duration: 0.5, ease: EASE }}
              />
              <motion.span
                className="ig__veil"
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="ig__ico"
                variants={{
                  hover: { opacity: 1, scale: 1 },
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Icono.instagram />
              </motion.span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="ig-cta"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          <motion.a
            className="btn btn--primary"
            href={CONTACTO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Ver el perfil en Instagram
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
