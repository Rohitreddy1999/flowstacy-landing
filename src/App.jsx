import { useRef } from 'react'
import './index.css'
import FluidCanvas from './components/FluidCanvas'
import HeroText from './components/HeroText'
import HookSection from './components/HookSection'
import ShiftSection from './components/ShiftSection'
import HowItWorks from './components/HowItWorks'
import ForYouSection from './components/ForYouSection'

export default function App() {
  const wordmarkRef = useRef(null)
  const hintRef     = useRef(null)

  return (
    <div style={{ background: '#000000' }}>
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000000' }}>
        <FluidCanvas
          ambient={true}
          holdSeconds={1.4}
          tendrilDensity={1}
          wordmarkRef={wordmarkRef}
          hintRef={hintRef}
        />
        <HeroText wordmarkRef={wordmarkRef} hintRef={hintRef} />
      </div>

      <HookSection />
      <ShiftSection />
      <HowItWorks />
      <ForYouSection />
    </div>
  )
}
