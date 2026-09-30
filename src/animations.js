/* =========================================================
   Variantes de animación compartidas
   ========================================================= */

export const EASE = [0.22, 1, 0.36, 1]
export const EASE_SOFT = [0.4, 0, 0.2, 1]

/* Contenedor que se revela al entrar en viewport */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: EASE },
  },
}

export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
}

export const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
}

/* Para listas de items: stagger padre + hijo */
export const listParent = (stagger = 0.09, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

export const listChild = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

/* Config común para mientrasInView.
   amount: 0 (no fraccional) a propósito: un contenedor de cards mide miles de px
   en mobile y un amount fraccional (0.12) es IMPOSIBLE de cumplir si el viewport
   es más bajo que ese porcentaje — el observer nunca dispara y todo queda en
   opacity: 0. Con amount: 0 dispara al primer pixel visible. */
export const viewportOnce = { once: true, amount: 0, margin: '0px 0px -60px 0px' }
export const viewportSoft = { once: true, amount: 0, margin: '0px 0px -40px 0px' }
