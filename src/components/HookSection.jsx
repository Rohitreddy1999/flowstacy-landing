import { useRef } from 'react'
import { motion, useAnimate } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

function HeadlineLine({ children }) {
  const [scope, animate] = useAnimate()
  const animating = useRef(false)

  async function handleHover() {
    if (animating.current) return
    animating.current = true
    await animate(scope.current, { x: ['-100%', '100%'] }, { duration: 0.8, ease: EASE })
    animate(scope.current, { x: '-100%' }, { duration: 0 })
    animating.current = false
  }

  return (
    <span
      onMouseEnter={handleHover}
      style={{
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        hyphens: 'none',
        wordBreak: 'normal',
      }}
    >
      {children}
      <span
        ref={scope}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.08)',
          transform: 'translateX(-100%)',
          pointerEvents: 'none',
        }}
      />
    </span>
  )
}

export default function HookSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '80px 0',
      }}
    >
      <motion.div
        style={{
          maxWidth: '760px',
          width: '100%',
          padding: '0 clamp(32px, 6vw, 80px)',
          textAlign: 'center',
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p
          style={{
            margin: 0,
            marginBottom: '28px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'var(--color-accent-teal, #1D9E75)',
            textTransform: 'uppercase',
          }}
        >
          PHILOSOPHY
        </p>

        <h2
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 52px)',
            color: '#FFFFFF',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            hyphens: 'none',
            wordBreak: 'normal',
          }}
        >
          <HeadlineLine>Talent is something you nourish.</HeadlineLine>
          <HeadlineLine>Instinct is something you polish.</HeadlineLine>
        </h2>

        {/* mid-rule — visual breath between headline and body */}
        <div
          style={{
            width: '36px',
            height: '1px',
            background: 'rgba(255,255,255,0.18)',
            margin: '40px auto 36px',
          }}
        />

        <p
          style={{
            margin: '0 auto',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            color: 'rgba(255,255,255,0.52)',
            maxWidth: '500px',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            hyphens: 'none',
            wordBreak: 'normal',
          }}
        >
          Hard work and consistency can become talent — even when talent was never
          there to begin with. That locked-in, world-goes-quiet state where
          everything clicks — that is flow. Flowstacy gives every person the
          system to find it.
        </p>
      </motion.div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
        }}
      />
    </section>
  )
}
