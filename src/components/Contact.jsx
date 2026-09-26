import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CONTACTO } from '../data'
import { EASE, listChild, listParent, viewportOnce } from '../animations'

const INTERESES = [
  'Un proyecto específico',
  'Vivienda nueva',
  'Lote o terreno',
  'Local u oficina',
  'Inversión / renting',
  'Vender mi propiedad',
]

const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

function campoInvalido(campo) {
  if (campo === 'nombre') return 'Ingresá tu nombre.'
  if (campo === 'tel') return 'Ingresá un teléfono válido.'
  if (campo === 'email') return 'Ingresá un email válido.'
  return ''
}

export default function Contact() {
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  function validar(e) {
    const d = e.currentTarget
    const proximos = {}

    const nombre = d.nombre.value.trim()
    if (nombre.length < 2) proximos.nombre = campoInvalido('nombre')

    const tel = d.tel.value.trim()
    if (tel.replace(/\D/g, '').length < 8) proximos.tel = campoInvalido('tel')

    if (!emailValido(d.email.value)) proximos.email = campoInvalido('email')

    if (!d.acepto.checked) proximos.acepto = 'Necesitamos tu consentimiento para poder escribirte.'

    setErrores(proximos)
    return Object.keys(proximos).length === 0
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!validar(e)) return
    // Demo: no se envía a ningún servidor.
    setEnviado(true)
    e.currentTarget.reset()
  }

  return (
    <section className="section contact" id="contacto">
      <div className="wrap contact__wrap">
        <motion.div
          className="contact__info"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="eyebrow">Contacto</p>
          <h2 className="h2">Agendá tu visita</h2>
          <p>
            Contanos qué estás buscando y un asesor de ATESSA te contacta en menos de 24
            horas hábiles. Las visitas a obra se coordinan previamente.
          </p>

          <motion.ul
            className="contact__list"
            variants={listParent(0.08, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {[
              { k: 'Oficina', v: `${CONTACTO.direccion} — ${CONTACTO.ciudad}`, href: null },
              { k: 'Teléfono', v: CONTACTO.tel, href: CONTACTO.telHref },
              { k: 'WhatsApp', v: CONTACTO.wa, href: CONTACTO.waHref },
              { k: 'Email', v: CONTACTO.mail, href: `mailto:${CONTACTO.mail}` },
              { k: 'Horario', v: CONTACTO.horario, href: null },
            ].map((c) => (
              <motion.li key={c.k} variants={listChild}>
                <span>{c.k}</span>
                <strong>{c.href ? <a href={c.href}>{c.v}</a> : c.v}</strong>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="form-wrap"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="form__row">
              <div className={`field ${errores.nombre ? 'is-invalid' : ''}`}>
                <label htmlFor="nombre">Nombre y apellido *</label>
                <motion.input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Juan Pérez"
                  animate={errores.nombre ? { x: [0, -7, 7, -5, 0] } : { x: 0 }}
                  transition={{ duration: 0.35 }}
                />
                <AnimatePresence>
                  {errores.nombre && (
                    <motion.small
                      className="err"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {errores.nombre}
                    </motion.small>
                  )}
                </AnimatePresence>
              </div>

              <div className={`field ${errores.tel ? 'is-invalid' : ''}`}>
                <label htmlFor="tel">Teléfono *</label>
                <motion.input
                  id="tel"
                  name="tel"
                  type="tel"
                  placeholder="+54 9 387 ..."
                  animate={errores.tel ? { x: [0, -7, 7, -5, 0] } : { x: 0 }}
                  transition={{ duration: 0.35 }}
                />
                <AnimatePresence>
                  {errores.tel && (
                    <motion.small
                      className="err"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {errores.tel}
                    </motion.small>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="form__row">
              <div className={`field ${errores.email ? 'is-invalid' : ''}`}>
                <label htmlFor="email">Email *</label>
                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="juan@correo.com"
                  animate={errores.email ? { x: [0, -7, 7, -5, 0] } : { x: 0 }}
                  transition={{ duration: 0.35 }}
                />
                <AnimatePresence>
                  {errores.email && (
                    <motion.small
                      className="err"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {errores.email}
                    </motion.small>
                  )}
                </AnimatePresence>
              </div>

              <div className="field">
                <label htmlFor="tipo">Me interesa</label>
                <select id="tipo" name="tipo" defaultValue={INTERESES[0]}>
                  {INTERESES.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="msg">Mensaje</label>
              <textarea
                id="msg"
                name="msg"
                rows="4"
                placeholder="Contanos qué buscás, zona preferida, forma de pago…"
              />
            </div>

            <label className={`check ${errores.acepto ? 'is-invalid' : ''}`}>
              <input type="checkbox" id="acepto" name="acepto" />
              <span>
                Acepto ser contactado por ATESSA y el tratamiento de mis datos según la Ley
                25.326 de Protección de Datos Personales.
              </span>
            </label>
            <AnimatePresence>
              {errores.acepto && (
                <motion.small
                  className="err err--block"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {errores.acepto}
                </motion.small>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              className="btn btn--primary btn--block"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Enviar consulta
            </motion.button>

            <AnimatePresence>
              {enviado && (
                <motion.p
                  className="form__ok"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  ¡Gracias! Recibimos tu consulta. Te contactamos a la brevedad.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
