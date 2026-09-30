// Inspección mobile: reproduce el reporte "no cargan los inmuebles disponibles".
import puppeteer from 'puppeteer-core'

const URL = process.env.URL || 'http://localhost:4321/'
const VIEWPORTS = [
  { name: 'iPhone SE 320', w: 320, h: 568 },
  { name: 'Android chico 360', w: 360, h: 740 },
  { name: 'iPhone 12 390', w: 390, h: 844 },
  { name: 'iPhone Pro Max 430', w: 430, h: 932 },
]

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
})

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

for (const vp of VIEWPORTS) {
  const page = await browser.newPage()
  const errores = []
  page.on('pageerror', (e) => errores.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errores.push(m.text()))
  page.on('requestfailed', (r) => errores.push(`REQFAIL ${r.url().slice(0, 80)}`))

  await page.setViewport({ width: vp.w, height: vp.h, isMobile: true, hasTouch: true })
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(2500)

  console.log(`\n================ ${vp.name} (${vp.w}px) ================`)

  const dom = await page.evaluate(() => ({
    grid: !!document.querySelector('.grid'),
    cards: document.querySelectorAll('.pcard').length,
    filters: document.querySelectorAll('.filter').length,
  }))
  console.log(`DOM       grid=${dom.grid}  cards=${dom.cards}  filters=${dom.filters}`)

  const ov = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  )
  console.log(`Overflow  ${ov}px`)

  await page.evaluate(() => document.getElementById('proyectos').scrollIntoView())
  await sleep(2500)

  const vis = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.pcard')]
    const r0 = cards[0]?.getBoundingClientRect()
    return {
      total: cards.length,
      visibles: cards.filter((c) => {
        const s = getComputedStyle(c)
        const r = c.getBoundingClientRect()
        return s.opacity !== '0' && s.visibility !== 'hidden' && r.width > 50 && r.height > 50
      }).length,
      opacities: [...new Set(cards.map((c) => getComputedStyle(c).opacity))],
      transforms: [...new Set(cards.map((c) => getComputedStyle(c).transform.slice(0, 45)))],
      gridW: Math.round(document.querySelector('.grid')?.getBoundingClientRect().width || 0),
      card0: r0 ? { w: Math.round(r0.width), h: Math.round(r0.height), x: Math.round(r0.left) } : null,
      card0style: cards[0]?.getAttribute('style')?.slice(0, 170) || null,
      card1style: cards[1]?.getAttribute('style')?.slice(0, 170) || null,
    }
  })
  console.log(`Visibles  ${vis.visibles}/${vis.total}`)
  console.log(`  opacities : ${vis.opacities.join(', ')}`)
  console.log(`  transforms: ${vis.transforms.join(' | ')}`)
  console.log(`  grid/card0: ${vis.gridW}px / ${JSON.stringify(vis.card0)}`)
  console.log(`  style[0]  : ${vis.card0style}`)
  console.log(`  style[1]  : ${vis.card1style}`)

  const imgs = await page.evaluate(() => {
    const l = [...document.querySelectorAll('.pcard img')]
    return {
      total: l.length,
      rotas: l.filter((i) => i.complete && i.naturalWidth === 0).length,
      pendientes: l.filter((i) => !i.complete).length,
    }
  })
  console.log(`Imgs      total=${imgs.total} rotas=${imgs.rotas} pendientes=${imgs.pendientes}`)

  // Orden real: 1=Todos 2=Residencial 3=Departamentos 4=Terrenos 5=Comercial.
  // Solo exigimos visibilidad de las tarjetas que intersectan el viewport: las de
  // abajo del fold deben seguir ocultas hasta que entren en pantalla.
  const enViewportVisibles = () =>
    page.$$eval('.pcard', (cs) => {
      const enPantalla = cs.filter((c) => {
        const r = c.getBoundingClientRect()
        return r.bottom > 0 && r.top < window.innerHeight
      })
      const visibles = enPantalla.filter((c) => getComputedStyle(c).opacity !== '0')
      return { enPantalla: enPantalla.length, visibles: visibles.length }
    })

  const filtros = []
  let filtroOk = true
  for (const [i, label, exp] of [
    [2, 'Residencial', 4],
    [3, 'Departamentos', 2],
    [4, 'Terrenos', 1],
    [5, 'Comercial', 2],
    [1, 'Todos', 9],
  ]) {
    await page.click(`.filter:nth-child(${i})`)
    await sleep(1100)
    const n = await page.$$eval('.pcard', (x) => x.length)
    const { enPantalla, visibles } = await enViewportVisibles()
    const ok = n === exp && visibles === enPantalla
    if (!ok) filtroOk = false
    filtros.push(`${label}→${n}tar(${visibles}/${enPantalla}vis)${ok ? '' : ` exp:${exp} ✗`}`)
  }
  console.log(`Filtros   ${filtros.join('  ')} ${filtroOk ? '' : '<<< FALLA'}`)

  // Scroll progresivo: al bajar por la sección cada tarjeta debe revelarse.
  await page.evaluate(() => {
    document.getElementById('proyectos').scrollIntoView()
    window.scrollBy(0, -100)
  })
  await sleep(900)
  for (let paso = 0; paso < 14; paso++) {
    await page.evaluate(() => window.scrollBy(0, 420))
    await sleep(600)
    await page.evaluate(() => {
      const gr = document.getElementById('proyectos').getBoundingClientRect()
      if (gr.bottom < 200) window.scrollBy(0, 900)
    })
  }
  await sleep(1200)
  const totalVisibles = await page.$$eval(
    '.pcard',
    (cs) => cs.filter((c) => getComputedStyle(c).opacity !== '0').length
  )
  const totalCards = await page.$$eval('.pcard', (x) => x.length)
  const scrollOk = totalVisibles === totalCards
  console.log(
    `Scroll    ${totalVisibles}/${totalCards} reveladas recorriendo la sección ${scrollOk ? '' : '<<< FALLA'}`
  )

  await sleep(2000)
  const imgs2 = await page.evaluate(() => {
    const l = [...document.querySelectorAll('.pcard img')]
    return {
      total: l.length,
      rotas: l.filter((i) => i.complete && i.naturalWidth === 0).length,
      cargadas: l.filter((i) => i.complete && i.naturalWidth > 0).length,
    }
  })
  const imgsOk = imgs2.rotas === 0 && imgs2.cargadas === imgs2.total
  console.log(
    `Imgs      ${imgs2.cargadas}/${imgs2.total} cargadas, ${imgs2.rotas} rotas ${imgsOk ? '' : '<<< FALLA'}`
  )

  const txt = await page.$eval('#proyectos', (n) => n.innerText.replace(/\n+/g, ' | ').slice(0, 180))
  console.log(`Texto     ${txt}`)
  console.log(`Errores   ${errores.length ? errores.slice(0, 3).join(' || ') : 'ninguno'}`)

  const erroresOk = errores.length === 0
  const overflowOk = ov <= 1
  const visOk = vis.visibles === vis.total
  const todo = erroresOk && overflowOk && visOk && filtroOk && scrollOk && imgsOk
  console.log(
    `\n${todo ? 'OK' : 'FALLA'}  ${vp.name}: vis=${vis.visibles}/${vis.total} overflow=${ov}px filtros=${filtroOk} scroll=${scrollOk} imgs=${imgsOk} sinErrores=${erroresOk}`
  )

  await page.close()
}

await browser.close()
