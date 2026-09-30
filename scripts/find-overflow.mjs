// Encuentra el/los elemento(s) que desbordan horizontalmente.
import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true })
await page.goto(process.env.URL || 'http://localhost:4321/', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 2000))

const culpables = await page.evaluate(() => {
  const docW = document.documentElement.clientWidth
  const out = []
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 && r.height === 0) continue
    const right = r.right + window.scrollX
    const left = r.left + window.scrollX
    if (right > docW + 0.5 || left < -0.5) {
      const s = getComputedStyle(el)
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.baseVal ?? el.className ?? '').toString().slice(0, 60),
        left: Math.round(left),
        right: Math.round(right),
        w: Math.round(r.width),
        pos: s.position,
        ovf: s.overflowX,
      })
    }
  }
  return { docW, scrollW: document.documentElement.scrollWidth, out: out.slice(0, 25) }
})

const r = culpables
console.log(`clientWidth=${r.docW}  scrollWidth=${r.scrollW}  overflow=${r.scrollW - r.docW}`)
console.log(`elementos que desbordan: ${r.out.length}`)
for (const o of r.out) {
  console.log(`  <${o.tag} class="${o.cls}"> left=${o.left} right=${o.right} w=${o.w} pos=${o.pos} overflowX=${o.ovf}`)
}

await browser.close()
