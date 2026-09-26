import { motion } from 'framer-motion'
import { CONTACTO, NAV } from '../data'
import { EASE, listChild, listParent } from '../animations'

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        className="wrap footer__grid"
        variants={listParent(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={listChild}>
          <a href="#top" className="logo logo--footer">
            <span className="logo__mark">A</span>
            <span className="logo__text">
              ATESSA
              <em>desarrollos</em>
            </span>
          </a>
          <p className="footer__txt">
            Desarrolladora inmobiliaria salteña. Construimos y administramos proyectos
            con profesionalismo, ética y eficiencia desde 2003.
          </p>
        </motion.div>

        <motion.div variants={listChild}>
          <h4>Navegación</h4>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={listChild}>
          <h4>Contacto</h4>
          <ul>
            <li>{CONTACTO.direccion}</li>
            <li>{CONTACTO.ciudad}</li>
            <li>
              <a href={CONTACTO.telHref}>{CONTACTO.tel}</a>
            </li>
            <li>
              <a href={`mailto:${CONTACTO.mail}`}>{CONTACTO.mail}</a>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={listChild}>
          <h4>Seguinos</h4>
          <ul>
            <li>
              <a href={CONTACTO.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={CONTACTO.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={CONTACTO.waHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        className="wrap footer__bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <p>© {new Date().getFullYear()} ATESSA Desarrollos. Todos los derechos reservados.</p>
        <p>Miembro de la Cámara de Desarrolladores Inmobiliarios de Salta (CADISAL).</p>
      </motion.div>
    </footer>
  )
}
