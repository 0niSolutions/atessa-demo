// Smoke test de render: valida que React monte, que no haya errores de consola,
// que las imágenes carguen y que los filtros del portafolio funcionen.
import puppeteer from 'puppeteer-core'

const URL = process.env.URL || 'http://localhost:4173/'
const CHROME =
  process.env.CHROME ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const results = []
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  → ' + detail : ''}`)
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

const errores = []
const warnings = []
page.on('console', (m) => {
  if (m.type() === 'error') errores.push(m.text())
  if (m.type() === 'warning') warnings.push(m.text())
})
page.on('pageerror', (e) => errores.push('PAGEERROR: ' + e.message))
page.on('requestfailed', (r) => {
  const u = r.url()
  if (!u.startsWith('data:')) errores.push(`REQFAIL: ${u} (${r.failure()?.errorText})`)
})

await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 })
await wait(2500)

const t = (sel) => page.$$eval(sel, (n) => n.length).catch(() => 0)
const txt = (sel) => page.$eval(sel, (n) => n.textContent.trim()).catch(() => '')

check('root montado', (await t('#root > *')) > 0, `${await t('#root > *')} hijos`)
check('navbar', (await t('.nav__inner')) === 1)
check('hero título', (await txt('.hero__title')).includes('lugares para vivir'))
check('hero stats', (await t('.hero__stats li')) === 4)
check('ticker items', (await t('.ticker__track span')) === 12, `${await t('.ticker__track span')}`)
check('tarjetas de proyecto', (await t('.pcard')) === 9, `${await t('.pcard')}`)
check('botones de filtro', (await t('.filter')) === 5, `${await t('.filter')}`)
check('tarjetas de servicio', (await t('.card-svc')) === 6, `${await t('.card-svc')}`)
check('items de inversión', (await t('.inv__list li')) === 4, `${await t('.inv__list li')}`)
check('testimonios', (await t('.quote')) === 3, `${await t('.quote')}`)
check('tiles de instagram', (await t('.ig')) === 12, `${await t('.ig')}`)
check('campos del formulario', (await t('.field')) === 5, `${await t('.field')}`)
check('footer + CADISAL', (await txt('.footer')).includes('CADISAL'))
check('barra de progreso', (await t('.scroll-progress')) === 1)
check('botón whatsapp visible tras scroll', await page.evaluate(async () => {
  window.scrollTo(0, 1200)
  await new Promise((r) => setTimeout(r, 900))
  return document.querySelector('.wa') !== null
}))

const rotas = await page.$$eval('img', (imgs) =>
  imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src)
)
check('todas las imágenes cargan', rotas.length === 0, rotas.length ? rotas.join(', ') : '0 rotas')

await page.evaluate(() => window.scrollTo(0, 0))
await wait(400)

// Filtro del portafolio
const visPantalla = () =>
  page.$$eval('.pcard', (cs) => {
    const enPantalla = cs.filter((c) => {
      const r = c.getBoundingClientRect()
      return r.bottom > 0 && r.top < window.innerHeight
    })
    return {
      n: cs.length,
      enPantalla: enPantalla.length,
      visibles: enPantalla.filter((c) => getComputedStyle(c).opacity !== '0').length,
    }
  })

await page.click('.filter:nth-child(3)')
await wait(1200)
check('filtro "Departamentos"', (await t('.pcard')) === 2, `${await t('.pcard')} tarjetas`)
const activo = await page.$eval('.filter.is-active .filter__txt', (n) => n.textContent)
check('píldora activa correcta', activo.trim() === 'Departamentos', activo.trim())
let v = await visPantalla()
check('filtro: las tarjetas en pantalla se animan', v.visibles === v.enPantalla, `${v.visibles}/${v.enPantalla}`)

await page.click('.filter:nth-child(2)')
await wait(1200)
check('filtro "Residencial"', (await t('.pcard')) === 4, `${await t('.pcard')} tarjetas`)
v = await visPantalla()
check('filtro: se animan también tras cambiar', v.visibles === v.enPantalla, `${v.visibles}/${v.enPantalla}`)

await page.click('.filter:nth-child(5)')
await wait(1200)
check('filtro "Comercial"', (await t('.pcard')) === 2, `${await t('.pcard')} tarjetas`)
v = await visPantalla()
check('filtro: sigue animando', v.visibles === v.enPantalla, `${v.visibles}/${v.enPantalla}`)

await page.click('.filter:nth-child(1)')
await wait(1200)
check('vuelta a "Todos"', (await t('.pcard')) === 9, `${await t('.pcard')} tarjetas`)
v = await visPantalla()
check('filtro: "Todos" animado', v.visibles === v.enPantalla, `${v.visibles}/${v.enPantalla}`)

// Recorrer toda la página: nada debe quedarse en opacity 0 por un whileInView mal configurado
await page.evaluate(() => window.scrollTo(0, 0))
await wait(400)
const alturaTotal = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < alturaTotal; y += 400) {
  await page.evaluate((y) => window.scrollTo(0, y), y)
  await wait(140)
}
await wait(1500)
const ocultas = await page.evaluate(() =>
  [...document.querySelectorAll('.pcard, .card-svc, .quote, .ig, .pillar, .inv__list li')].filter(
    (c) => getComputedStyle(c).opacity !== '0'
  ).length
)
const totalItems = await page.$$eval(
  '.pcard, .card-svc, .quote, .ig, .pillar, .inv__list li',
  (x) => x.length
)
check('todo se revela al recorrer la página', ocultas === totalItems, `${ocultas}/${totalItems}`)

// Validación del formulario
await page.evaluate(() => document.getElementById('contacto').scrollIntoView())
await wait(700)
await page.click('.form button[type=submit]')
await wait(700)
check('form marca campos requeridos', (await t('.field.is-invalid')) === 3, `${await t('.field.is-invalid')} inválidos`)
check('form muestra aviso de consentimiento', (await t('.check.is-invalid')) === 1)

await page.type('#nombre', 'Federico')
await page.type('#tel', '3875001234')
await page.type('#email', 'fede@test.com')
await page.click('#acepto')
await wait(300)
await page.click('.form button[type=submit]')
await wait(900)
check('form válido muestra confirmación', (await t('.form__ok')) === 1)

// Móvil
await page.setViewport({ width: 390, height: 844 })
await page.evaluate(() => window.scrollTo(0, 0))
await wait(600)
check('móvil: hamburguesa visible', await page.evaluate(() => {
  const b = document.getElementById('navToggle')
  return b && getComputedStyle(b).display !== 'none'
}))
await page.click('#navToggle')
await wait(700)
check('móvil: menú abre', await page.evaluate(() => {
  const l = document.getElementById('navLinks')
  return l.classList.contains('is-open') && l.getBoundingClientRect().height > 100
}))
check('móvil: backdrop presente', await page.evaluate(() => {
  return document.querySelector('.nav__backdrop') !== null
}))
check('móvil: hamburguesa se convierte en X', await page.evaluate(() => {
  const b = document.getElementById('navToggle')
  return b.classList.contains('is-open') && b.getAttribute('aria-label') === 'Cerrar menú'
}))
await page.click('#navLinks .nav__link')
await wait(700)
check('móvil: menú cierra al tocar un enlace', await page.evaluate(() => {
  const l = document.getElementById('navLinks')
  return !l.classList.contains('is-open') && l.getBoundingClientRect().height === 0
}))
check('móvil: backdrop desaparece al cerrar', await page.evaluate(() => {
  return document.querySelector('.nav__backdrop') === null
}))
check('móvil: body desbloquea scroll al cerrar', await page.evaluate(() => {
  return !document.body.classList.contains('nav-open')
}))
await page.click('#navToggle')
await wait(700)
check('móvil: menú abre de nuevo', await page.evaluate(() => {
  return document.getElementById('navLinks').classList.contains('is-open')
}))
await page.keyboard.press('Escape')
await wait(500)
check('móvil: Escape cierra el menú', await page.evaluate(() => {
  const l = document.getElementById('navLinks')
  return !l.classList.contains('is-open') && l.getBoundingClientRect().height === 0
}))
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
)
check('móvil: sin scroll horizontal', overflow <= 1, `overflow=${overflow}px`)

check('sin errores de consola', errores.length === 0, errores.slice(0, 4).join(' | '))
if (warnings.length) console.log(`\n(${warnings.length} warnings: ${warnings.slice(0, 3).join(' | ')})`)

const fallos = results.filter((r) => !r.pass)
console.log(`\n===== ${results.length - fallos.length}/${results.length} checks OK =====`)

await browser.close()
process.exit(fallos.length ? 1 : 0)
