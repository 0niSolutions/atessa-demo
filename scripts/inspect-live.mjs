// Diagnóstico del sitio publicado en Netlify, viewport mobile.
import puppeteer from 'puppeteer-core'

const URL = process.argv[2] || 'https://atessa-demo.netlify.app/'
const W = Number(process.argv[3] || 390)
const H = Number(process.argv[4] || 844)

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
})
const page = await browser.newPage()
const errores = []
const reqfail = []
page.on('pageerror', (e) => errores.push('PAGEERROR: ' + e.message))
page.on('console', (m) => m.type() === 'error' && errores.push(m.text()))
page.on('requestfailed', (r) => reqfail.push(`${r.url().slice(0, 90)} ${r.failure()?.errorText}`))

await page.setViewport({ width: W, height: H, isMobile: true, hasTouch: true })
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 })
await new Promise((r) => setTimeout(r, 3000))

console.log(`URL   ${URL}`)
console.log(`Viewport ${W}x${H}`)
console.log(`Title ${await page.title()}`)
console.log(`Height total: ${await page.evaluate(() => document.body.scrollHeight)}px`)

// ¿Cuál bundle está desplegado?
const bundle = await page.evaluate(() =>
  [...document.querySelectorAll('script[src]')].map((s) => s.getAttribute('src'))
)
console.log(`Bundle ${bundle.join(', ')}`)

// Recorrer toda la página y auditar cada sección
const SECCIONES = [
  ['.hero', 'HERO'],
  ['.ticker', 'TICKER'],
  ['#nosotros', 'NOSOTROS'],
  ['#proyectos', 'PROYECTOS'],
  ['#servicios', 'SERVICIOS'],
  ['#inversion', 'INVERSION'],
  ['#contacto', 'CONTACTO'],
  ['#instagram', 'INSTAGRAM'],
  ['.footer', 'FOOTER'],
]

console.log(`\n=== Auditoría de secciones (recorriendo la página) ===`)
const informe = []
for (const paso of [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000]) {
  await page.evaluate((y) => window.scrollTo(0, y), paso)
  await new Promise((r) => setTimeout(r, 320))
}
await new Promise((r) => setTimeout(r, 2500))

for (const [sel, nombre] of SECCIONES) {
  const r = await page.evaluate((sel) => {
    const el = document.querySelector(sel)
    if (!el) return { falta: true }
    const items = [...el.querySelectorAll('.pcard, .card-svc, .quote, .ig, .pillar, .inv__list li, form')]
    const ocultos = items.filter((c) => {
      const s = getComputedStyle(c)
      return s.opacity === '0' || s.visibility === 'hidden' || s.display === 'none'
    })
    const box = el.getBoundingClientRect()
    return {
      h: Math.round(box.height),
      items: items.length,
      ocultos: ocultos.length,
      ejOculto: ocultos[0]?.className?.toString().slice(0, 40) || null,
      opacSeccion: getComputedStyle(el).opacity,
      transformSeccion: getComputedStyle(el).transform.slice(0, 40),
      texto: el.innerText.replace(/\n+/g, ' | ').slice(0, 90),
    }
  }, sel)
  if (r.falta) {
    console.log(`  ${nombre.padEnd(11)} FALTA EL ELEMENTO (${sel})`)
    informe.push(false)
  } else {
    const ok = r.ocultos === 0 && r.h > 0 && r.opacSeccion !== '0'
    informe.push(ok)
    console.log(
      `  ${nombre.padEnd(11)} ${ok ? 'OK  ' : 'FALLA'} h=${String(r.h).padStart(5)}px items=${String(r.items).padStart(2)} ocultos=${r.ocultos}${r.ejOculto ? ` ej="${r.ejOculto}"` : ''} secOpacity=${r.opacSeccion} secTransform=${r.transformSeccion}`
    )
    console.log(`               "${r.texto}"`)
  }
}

const ov = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
)
console.log(`\nOverflow horizontal: ${ov}px`)
console.log(`Errores JS: ${errores.length ? errores.slice(0, 5).join('\n  ') : 'ninguno'}`)
console.log(`Requests fallidas: ${reqfail.length ? reqfail.slice(0, 5).join('\n  ') : 'ninguna'}`)
console.log(`\n${informe.every(Boolean) ? 'TODO OK' : 'HAY SECCIONES OCULTAS'}`)

await browser.close()