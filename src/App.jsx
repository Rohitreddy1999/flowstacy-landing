import { useRef } from 'react'
import './index.css'
import FluidCanvas from './components/FluidCanvas'
import HeroText from './components/HeroText'

export default function App() {
  const wordmarkRef = useRef(null)
  const hintRef     = useRef(null)

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000000', overflow: 'hidden' }}>
      <FluidCanvas
        ambient={true}
        holdSeconds={1.4}
        tendrilDensity={1}
        wordmarkRef={wordmarkRef}
        hintRef={hintRef}
      />
      <HeroText wordmarkRef={wordmarkRef} hintRef={hintRef} />
    </div>
  )
}
