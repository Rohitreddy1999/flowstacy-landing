import { useEffect, useRef, useState, useCallback } from 'react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const DIARY_LINES = [
  { text: "If you said 'I'll start Monday'\none more time.", size: 'clamp(24px, 3.5vw, 48px)' },
  { text: "If you know exactly what to do\n— and still don't.", size: 'clamp(24px, 3.5vw, 48px)' },
  { text: 'If—', size: 'clamp(32px, 5vw, 64px)' },
  { text: 'If—', size: 'clamp(40px, 6vw, 80px)' },
  { text: 'If—', size: 'clamp(48px, 7vw, 96px)' },
]

function CharReveal({ text, fontSize, color = '#ffffff', onDone }) {
  const [revealed, setRevealed] = useState(0)
  const totalChars = text.replace(/\n/g, '').length
  const timerRef = useRef(null)

  useEffect(() => {
    setRevealed(0)
    let count = 0
    const chars = text.split('').filter(c => c !== '\n')
    const tick = () => {
      count++
      setRevealed(count)
      if (count < chars.length) {
        timerRef.current = setTimeout(tick, 40)
      } else {
        if (onDone) setTimeout(onDone, 0)
      }
    }
    timerRef.current = setTimeout(tick, 40)
    return () => clearTimeout(timerRef.current)
  }, [text])

  // Build spans preserving newlines
  let charIdx = 0
  const parts = text.split('\n').map((line, li) => {
    const spans = line.split('').map((ch, ci) => {
      const idx = charIdx++
      return (
        <span
          key={`${li}-${ci}`}
          style={{
            opacity: idx < revealed ? 1 : 0,
            transition: 'opacity 0.05s',
            display: 'inline',
          }}
        >
          {ch}
        </span>
      )
    })
    return (
      <span key={li} style={{ display: 'block' }}>
        {spans}
      </span>
    )
  })

  return (
    <div
      style={{
        fontSize,
        fontWeight: 800,
        color,
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        hyphens: 'none',
        lineHeight: 1.2,
        whiteSpace: 'pre-line',
      }}
    >
      {parts}
    </div>
  )
}

function WavyText({ text, active }) {
  const letters = text.split('')
  const [bobbing, setBobbing] = useState(false)

  useEffect(() => {
    if (!active) { setBobbing(false); return }
    const t = setTimeout(() => setBobbing(true), letters.length * 60 + 600)
    return () => clearTimeout(t)
  }, [active, letters.length])

  return (
    <div
      style={{
        fontSize: 'clamp(28px, 4vw, 56px)',
        fontWeight: 800,
        color: '#1D9E75',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        hyphens: 'none',
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {letters.map((ch, i) => (
        <Letter
          key={i}
          ch={ch}
          index={i}
          active={active}
          bobbing={bobbing}
        />
      ))}
    </div>
  )
}

function Letter({ ch, index, active, bobbing }) {
  const style = {
    display: 'inline-block',
    opacity: active ? 1 : 0,
    transform: active ? 'translateY(0)' : 'translateY(20px)',
    transition: active
      ? `opacity 0.6s ${EASE} ${index * 60}ms, transform 0.6s ${EASE} ${index * 60}ms`
      : 'none',
    whiteSpace: ch === ' ' ? 'pre' : 'normal',
  }

  if (bobbing && ch !== ' ') {
    const delay = index * 0.15
    return (
      <span
        style={{
          ...style,
          animation: `bob 3s ease-in-out ${delay}s infinite`,
        }}
      >
        {ch}
      </span>
    )
  }

  return <span style={style}>{ch}</span>
}

// Phase constants
const PHASE = {
  IDLE: 'idle',
  QUESTION: 'question',           // 0-3.5s
  DIARY: 'diary',                 // 3.5-14.5s
  NOW: 'now',                     // 14.5-17.5s
  NOW_DRIFT: 'now_drift',         // 17s-
  FOR_YOU: 'for_you',             // 17.5s+
  DONE: 'done',
}

export default function ForYouSection() {
  const sectionRef = useRef(null)
  const timersRef = useRef([])
  const isFirstPlay = useRef(true)

  const [phase, setPhase] = useState(PHASE.IDLE)
  const [questionVisible, setQuestionVisible] = useState(false)
  const [diaryIndex, setDiaryIndex] = useState(-1)
  const [diaryVisible, setDiaryVisible] = useState(false)
  const [nowVisible, setNowVisible] = useState(false)
  const [nowDrift, setNowDrift] = useState(false)
  const [forYouVisible, setForYouVisible] = useState(false)

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const delay = (fn, ms) => {
    const t = setTimeout(fn, ms)
    timersRef.current.push(t)
    return t
  }

  const reset = () => {
    setPhase(PHASE.IDLE)
    setQuestionVisible(false)
    setDiaryIndex(-1)
    setDiaryVisible(false)
    setNowVisible(false)
    setNowDrift(false)
    setForYouVisible(false)
  }

  const runDiarySequence = useCallback((startMs) => {
    // Line 1 at 3.5s (or 0 if looping)
    const times = [0, 2500, 1200, 1200, 800]
    let cursor = startMs

    DIARY_LINES.forEach((_, idx) => {
      const lineStart = cursor
      delay(() => {
        setDiaryIndex(idx)
        setDiaryVisible(true)
      }, lineStart)
      // hold 1500ms after reveal (reveal takes ~40*chars ms)
      const revealMs = DIARY_LINES[idx].text.replace(/\n/g, '').length * 40
      delay(() => {
        setDiaryVisible(false)
      }, lineStart + revealMs + 1500)
      cursor += revealMs + 1500 + 600 + 200 // fade(600) + gap(200)
    })
    return cursor
  }, [])

  const runSequence = useCallback((first) => {
    clearTimers()
    reset()

    let cursor = 0

    if (first) {
      // Step 1: Question 0 → 3.5s
      delay(() => {
        setPhase(PHASE.QUESTION)
        setQuestionVisible(true)
      }, 0)
      delay(() => setQuestionVisible(false), 2000)
      cursor = 3500
    }

    // Step 2: Diary sequence starting at cursor
    setPhase(PHASE.DIARY)
    const afterDiary = runDiarySequence(cursor)

    // Step 3: NOW slams in
    delay(() => {
      setPhase(PHASE.NOW)
      setDiaryIndex(-1)
      setDiaryVisible(false)
      setNowVisible(true)
    }, afterDiary)

    // NOW drifts at afterDiary + 2500
    delay(() => {
      setNowDrift(true)
      setPhase(PHASE.NOW_DRIFT)
    }, afterDiary + 2500)

    // Step 4: For You at afterDiary + 3000
    delay(() => {
      setForYouVisible(true)
      setPhase(PHASE.FOR_YOU)
    }, afterDiary + 3000)

    // Loop: wait 3s after for_you appears, then restart from step 2
    const loopStart = afterDiary + 3000 + letters_ms('Flowstacy is for you.') + 3000
    delay(() => {
      isFirstPlay.current = false
      runSequence(false)
    }, loopStart)
  }, [runDiarySequence])

  function letters_ms(text) {
    return text.length * 60 + 600 + 2000
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isFirstPlay.current = true
          runSequence(true)
        } else {
          clearTimers()
          reset()
          isFirstPlay.current = true
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(section)
    return () => {
      observer.disconnect()
      clearTimers()
    }
  }, [runSequence])

  const currentDiaryLine = diaryIndex >= 0 ? DIARY_LINES[diaryIndex] : null

  return (
    <>
      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          minHeight: '100vh',
          background: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Step 1: Opening question */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            opacity: questionVisible ? 1 : 0,
            transition: questionVisible
              ? 'opacity 1s ease'
              : 'opacity 1s ease',
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(16px, 2vw, 22px)',
              color: 'rgba(255,255,255,0.5)',
              textAlign: 'center',
              hyphens: 'none',
              margin: 0,
            }}
          >
            Who is Flowstacy for?
          </p>
        </div>

        {/* Step 2: Diary lines */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '0 5vw',
            opacity: diaryVisible ? 1 : 0,
            transition: diaryVisible
              ? 'opacity 0.4s ease'
              : 'opacity 0.6s ease',
            pointerEvents: 'none',
          }}
        >
          {currentDiaryLine && (
            <CharReveal
              key={diaryIndex}
              text={currentDiaryLine.text}
              fontSize={currentDiaryLine.size}
            />
          )}
        </div>

        {/* Step 3: NOW */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            opacity: nowVisible ? (nowDrift ? 0.15 : 1) : 0,
            transform: nowDrift ? 'translateY(120px)' : 'translateY(0) scale(1)',
            transition: nowVisible
              ? nowDrift
                ? 'opacity 1.8s ease-in, transform 1.8s ease-in'
                : `opacity 0.4s ${EASE}, transform 0.4s ${EASE}`
              : 'none',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(80px, 12vw, 160px)',
              color: '#ffffff',
              letterSpacing: '0.05em',
              lineHeight: 1,
              // Slam in from scale 1.4 — handled via initial then settled
              transform: nowVisible && !nowDrift ? 'scale(1)' : undefined,
            }}
          >
            NOW.
          </span>
        </div>

        {/* Step 4: Flowstacy is for you */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            pointerEvents: 'none',
          }}
        >
          <WavyText text="Flowstacy is for you." active={forYouVisible} />
        </div>
      </section>
    </>
  )
}
