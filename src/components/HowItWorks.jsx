import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

const STEP_META = [
  { label: 'DISCOVER' },
  { label: 'CHOOSE' },
  { label: '21 DAYS' },
  { label: 'GRADUATE' },
  { label: 'COMMUNITY' },
]

const STEP_CONTENT = [
  {
    eyebrow: '01 — DISCOVER',
    headline: 'Discover what you truly want',
    description:
      "Five emotional questions nobody else asks. Not your goals — but how it feels when another week passes and you still didn't start. Your answers reveal the path.",
  },
  {
    eyebrow: '02 — CHOOSE',
    headline: 'Choose your path',
    description:
      'Five tracks built around the life you want to build. Your answers guide you — but the choice is always yours.',
  },
  {
    eyebrow: '03 — 21 DAYS',
    headline: 'Your 21 days. Built for you.',
    description:
      'Every day is planned. Every task is researched, science-backed, and specific to your track. You just show up.',
  },
  {
    eyebrow: '04 — GRADUATE',
    headline: 'Graduate and go deeper',
    description:
      'Day 21. You did it. Now the marketplace opens — connect with verified professionals to take your track further.',
  },
  {
    eyebrow: '05 — COMMUNITY',
    headline: "You're never doing this alone",
    description:
      'People on the same track, different tracks — sharing wins, hard days, and everything in between.',
  },
]

// ─── MOCKUP COMPONENTS ───────────────────────────────────────

function MockupLabel({ children }) {
  return (
    <p
      style={{
        margin: '0 0 20px',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: '10px',
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </p>
  )
}

function DiscoverMockup() {
  const answers = [
    "Heavy. Like I've let myself down.",
    "Numb. I've stopped expecting myself to change.",
    "Frustrated. I know I could but I don't.",
    'Anxious. Time keeps moving.',
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <MockupLabel>QUESTION 2 OF 5</MockupLabel>
      <p
        style={{
          margin: '0 0 24px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: '16px',
          color: '#FFFFFF',
          lineHeight: 1.6,
        }}
      >
        How does it feel when another week passes and you still didn't start?
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {answers.map((text, i) => (
          <div
            key={i}
            style={{
              padding: '14px 20px',
              borderRadius: '12px',
              border: `1px solid ${i === 1 ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
              background: i === 1 ? '#9D92F8' : 'rgba(255,255,255,0.06)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: i === 1 ? '#fff' : 'rgba(255,255,255,0.7)',
              lineHeight: 1.5,
              cursor: 'default',
            }}
          >
            {text}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: '24px',
          padding: '16px',
          borderRadius: '12px',
          background: '#1D9E75',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: '15px',
          color: '#000',
          textAlign: 'center',
          cursor: 'default',
        }}
      >
        Continue
      </div>
    </div>
  )
}

function ChooseMockup() {
  const tracks = [
    { name: 'MOVE', sub: 'Body, fitness & athletics' },
    { name: 'FOCUS', sub: 'Discipline, structure & habits' },
    { name: 'RHYTHM', sub: 'Music & instruments', active: true },
    { name: 'EXPRESS', sub: 'Art, design & creativity' },
    { name: 'CALM', sub: 'Mindfulness & inner peace' },
  ]
  return (
    <div>
      <MockupLabel>YOUR TRACK</MockupLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tracks.map((track) => (
          <div
            key={track.name}
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              border: `1px solid ${track.active ? 'rgba(29,158,117,0.3)' : 'rgba(255,255,255,0.06)'}`,
              background: track.active ? 'rgba(29,158,117,0.08)' : 'transparent',
              boxShadow: track.active ? 'inset 2px 0 0 #1D9E75' : 'none',
              cursor: 'default',
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                color: track.active ? '#1D9E75' : '#FFFFFF',
              }}
            >
              {track.name}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                marginTop: '2px',
              }}
            >
              {track.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DaysMockup() {
  const blocks = [
    {
      label: 'WHAT TO DO',
      text: '20 minutes of intentional movement. No phone. Full presence.',
    },
    {
      label: 'WHY THIS MATTERS',
      text: 'Day 7 is where most people quit. Showing up today rewires the pattern.',
    },
  ]
  return (
    <div>
      <MockupLabel>DAY 07 OF 21</MockupLabel>
      <div
        style={{
          width: '100%',
          height: '3px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '2px',
          marginBottom: '24px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '33%',
            height: '100%',
            background: '#1D9E75',
            borderRadius: '2px',
          }}
        />
      </div>
      <p
        style={{
          margin: '0 0 20px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: '18px',
          color: '#FFFFFF',
        }}
      >
        The Consistency Window
      </p>
      {blocks.map((block) => (
        <div
          key={block.label}
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
            }}
          >
            {block.label}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
            }}
          >
            {block.text}
          </p>
        </div>
      ))}
      <div
        style={{
          marginTop: '4px',
          padding: '14px',
          borderRadius: '12px',
          background: 'rgba(29,158,117,0.15)',
          border: '1px solid rgba(29,158,117,0.3)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: '14px',
          color: '#1D9E75',
          textAlign: 'center',
          cursor: 'default',
        }}
      >
        Complete Day 7
      </div>
    </div>
  )
}

function GraduateMockup() {
  const pros = [
    {
      name: 'Sarah K.',
      role: 'Certified Movement Coach',
      gradient: 'linear-gradient(135deg, #1D9E75, #9D92F8)',
    },
    {
      name: 'Marcus T.',
      role: 'Performance Athlete & Mentor',
      gradient: 'linear-gradient(135deg, #9D92F8, #1D9E75)',
    },
  ]
  return (
    <div>
      <p
        style={{
          margin: '0 0 8px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: '14px',
          color: '#1D9E75',
        }}
      >
        🎓 DAY 21 COMPLETE
      </p>
      <p
        style={{
          margin: '0 0 32px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: '18px',
          color: '#FFFFFF',
        }}
      >
        You've built the foundation.
      </p>
      <div>
        {pros.map((pro, i) => (
          <div key={pro.name}>
            {i > 0 && (
              <div
                style={{
                  height: '1px',
                  background: 'rgba(255,255,255,0.06)',
                  margin: '20px 0',
                }}
              />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: pro.gradient,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#FFFFFF',
                  }}
                >
                  {pro.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '2px',
                  }}
                >
                  {pro.role}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '13px',
                  color: '#1D9E75',
                  whiteSpace: 'nowrap',
                  cursor: 'default',
                }}
              >
                Book a session →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CommunityMockup() {
  const posts = [
    {
      author: 'Alex R.',
      track: 'MOVE track',
      text: "Day 14 done. Never thought I'd say this but I actually looked forward to waking up today.",
      hearts: 24,
      comments: 8,
    },
    {
      author: 'Jordan M.',
      track: 'CALM track',
      text: 'Meditated for the first time without my mind running. Day 9.',
      hearts: 31,
      comments: 12,
    },
    {
      author: 'Priya S.',
      track: 'FOCUS track',
      text: 'Built the habit. Now it builds me.',
      hearts: 47,
      comments: 19,
    },
  ]
  return (
    <div>
      {posts.map((post, i) => (
        <div
          key={post.author}
          style={{
            borderBottom:
              i < posts.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            padding: '16px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                flexShrink: 0,
              }}
            />
            <div>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#FFFFFF',
                }}
              >
                {post.author}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.4)',
                  marginLeft: '6px',
                }}
              >
                — {post.track}
              </span>
            </div>
          </div>
          <p
            style={{
              margin: '0 0 10px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              color: '#FFFFFF',
              lineHeight: 1.6,
            }}
          >
            {post.text}
          </p>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            ❤️ {post.hearts}&nbsp;&nbsp;💬 {post.comments}
          </div>
        </div>
      ))}
    </div>
  )
}

const MOCKUPS = [
  DiscoverMockup,
  ChooseMockup,
  DaysMockup,
  GraduateMockup,
  CommunityMockup,
]

// ─── TILT CARD ───────────────────────────────────────────────

function TiltCard({ children }) {
  const ref = useRef(null)

  function onMouseMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    el.style.transform = `perspective(1000px) rotateX(${(-dy * 8).toFixed(2)}deg) rotateY(${(dx * 8).toFixed(2)}deg)`
    el.style.transition = 'transform 0.1s linear'
  }

  function onMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    el.style.transition = `transform 0.6s cubic-bezier(${EASE.join(',')})`
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        width: '420px',
        minHeight: '520px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow:
          '0 0 80px rgba(29,158,117,0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )
}

// ─── PROGRESS INDICATOR ──────────────────────────────────────

function ProgressIndicator({ activeStep, visible }) {
  return (
    <div
      style={{
        position: 'fixed',
        right: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }}
    >
      {STEP_META.map((step, i) => {
        const isActive = activeStep === i
        return (
          <div key={step.label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isActive ? '#1D9E75' : 'rgba(255,255,255,0.2)',
                  boxShadow: isActive ? '0 0 12px #1D9E75' : 'none',
                  transform: isActive ? 'scale(1.4)' : 'scale(1)',
                  transition: 'all 0.4s ease',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: isActive ? '#1D9E75' : 'rgba(255,255,255,0.4)',
                  transition: 'color 0.4s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {String(i + 1).padStart(2, '0')} — {step.label}
              </span>
            </div>
            {i < STEP_META.length - 1 && (
              <div
                style={{
                  width: '1px',
                  height: '120px',
                  background: 'rgba(255,255,255,0.1)',
                  margin: '6px 0 6px 3.5px',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── SINGLE STEP ─────────────────────────────────────────────

function Step({ index, content, Mockup, stepRef }) {
  const isOdd = index % 2 === 0
  const xOffset = isOdd ? -40 : 40

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: EASE }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: isOdd ? 'row' : 'row-reverse',
        gap: '80px',
        padding: '0 clamp(32px, 10vw, 120px)',
        flexWrap: 'wrap',
      }}
    >
      {/* Text side */}
      <div style={{ flex: '1 1 300px', maxWidth: '480px' }}>
        <p
          style={{
            margin: '0 0 24px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: '#1D9E75',
            textTransform: 'uppercase',
          }}
        >
          {content.eyebrow}
        </p>
        <h3
          style={{
            margin: '0 0 20px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 4vw, 52px)',
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {content.headline}
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.8,
            hyphens: 'none',
          }}
        >
          {content.description}
        </p>
      </div>

      {/* Mockup side */}
      <TiltCard>
        <Mockup />
      </TiltCard>
    </motion.div>
  )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const stepRefs = useRef([])
  const [activeStep, setActiveStep] = useState(0)
  const [sectionVisible, setSectionVisible] = useState(false)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const sectionObs = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.01 }
    )
    sectionObs.observe(sectionEl)

    const stepObs = stepRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i)
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    })

    return () => {
      sectionObs.disconnect()
      stepObs.forEach((obs) => obs?.disconnect())
    }
  }, [])

  return (
    <>
      <ProgressIndicator activeStep={activeStep} visible={sectionVisible} />

      <section ref={sectionRef} style={{ background: '#000000' }}>
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '120px clamp(24px, 6vw, 80px) 0',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              margin: '0 0 24px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: '#1D9E75',
              textTransform: 'uppercase',
            }}
          >
            HOW FLOWSTACY WORKS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            style={{
              margin: '0 0 120px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              maxWidth: '800px',
            }}
          >
            Five steps. One version of you that finally sticks.
          </motion.h2>
        </div>

        {/* Five steps */}
        {STEP_CONTENT.map((content, i) => (
          <Step
            key={i}
            index={i}
            content={content}
            Mockup={MOCKUPS[i]}
            stepRef={(el) => {
              stepRefs.current[i] = el
            }}
          />
        ))}

        {/* Bottom divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </section>
    </>
  )
}
