import { motion } from 'framer-motion'
import { TICKER } from '../data'

export default function Ticker() {
  const items = [...TICKER, ...TICKER]

  return (
    <div className="ticker">
      <motion.div
        className="ticker__track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
      >
        {items.map((t, i) => (
          <span key={`${t}-${i}`}>
            {t}
            <i>·</i>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
