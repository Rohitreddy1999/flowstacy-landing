import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView, useAnimate } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

const CARDS = [
  { num: '01', title: 'MIND', body: 'You stop reacting. You start choosing.' },
  { num: '02', title: 'HABITS', body: 'Small daily actions compound into identity.' },
  { num: '03', title: 'IDENTITY', body: "You don't just feel different. You are different." },
]

// progress thresholds at which each card activates
const THRESHOLDS = [0.28, 0.57, 0.86]

function Card({ num, title, body, isActive }) {
  const [scope, animateEl] = useAnimate()
  const wasActive = useRef(false)

  useEffect(() => {
    if (isActive && !wasActive.current) {
      // breathe: scale up then settle
      animateEl(scope.current, { scale: [1, 1.02, 1] }, { duration: 0.4, ease: EASE })
    }
    wasActive.current = isActive
  }, [isActive])

  return (
    <div
      ref={scope}
      style={{
        flex: 1,
        minWidth: 0,
        position: 'relative',
        zIndex: 1,
        borderRadius: '20px',
        border: `1px solid ${isActive ? 'rgba(29,158,117,0.4)' : 'rgba(255,255,255,0.08)'}`,
        padding: '48px 40px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: isActive
          ? '0 0 32px rgba(29,158,117,0.12), inset 0 1px 0 rgba(29,158,117,0.2)'
          : '0 0 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
    >
      <p
        style={{
          margin: '0 0 24px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.2)',
          textTransform: 'uppercase',
        }}
      >
        {num}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        <div
          style={{
            width: '2px',
            height: '24px',
            background: '#1D9E75',
            borderRadius: '1px',
            flexShrink: 0,
          }}
        />
        <h3
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: '28px',
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
      </div>

      <p
        style={{
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: '15px',
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.8,
        }}
      >
        {body}
      </p>
    </div>
  )
}

export default function ShiftSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, margin: '-10% 0px' })
  const progress = useMotionValue(0)
  const [activeCard, setActiveCard] = useState(-1)
  const prevCard = useRef(-1)

  // gradient: right of dot = barely visible track, left of dot = darkness
  const trackGradient = useTransform(progress, (val) => {
    const pct = (val * 100).toFixed(2)
    return `linear-gradient(to right, transparent ${pct}%, rgba(255,255,255,0.06) ${pct}%)`
  })

  // dot x position
  const dotLeft = useTransform(progress, (val) => `${(val * 100).toFixed(3)}%`)

  useEffect(() => {
    if (!inView) return

    const anim = animate(progress, [0, 1], {
      duration: 4,
      repeat: Infinity,
      ease: 'linear',
      repeatType: 'loop',
    })

    const unsub = progress.on('change', (val) => {
      let next = -1
      if (val > THRESHOLDS[2]) next = 2
      else if (val > THRESHOLDS[1]) next = 1
      else if (val > THRESHOLDS[0]) next = 0

      if (next !== prevCard.current) {
        prevCard.current = next
        setActiveCard(next)
      }
    })

    return () => {
      anim.stop()
      unsub()
    }
  }, [inView])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px clamp(24px, 6vw, 80px)',
      }}
    >
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          margin: '0 0 48px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: '11px',
          letterSpacing: '0.25em',
          color: '#1D9E75',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        THE SHIFT
      </motion.p>

      {/* Cards + traveling dot track */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '960px',
          display: 'flex',
          gap: '20px',
          alignItems: 'stretch',
        }}
      >
        {/* Track sits at vertical midpoint, behind cards */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            zIndex: 0,
          }}
        >
          {/* Gradient — fades out behind dot */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: trackGradient,
            }}
          />

          {/* Traveling dot */}
          <motion.div
            style={{
              position: 'absolute',
              top: '-3.5px',
              left: dotLeft,
              translateX: '-50%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#1D9E75',
              boxShadow: '0 0 12px #1D9E75, 0 0 24px rgba(29,158,117,0.4)',
              zIndex: 2,
            }}
          />
        </div>

        {CARDS.map((card, i) => (
          <Card key={card.num} {...card} isActive={activeCard === i} />
        ))}
      </div>
    </section>
  )
}
