import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Investment from './components/Investment'
import Testimonials from './components/Testimonials'
import Instagram from './components/Instagram'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Projects />
        <Services />
        <Investment />
        <Testimonials />
        <Instagram />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
