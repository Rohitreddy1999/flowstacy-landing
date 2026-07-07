import { useState } from 'react'

export default function HeroText({ wordmarkRef, hintRef }) {
  const [btnHover, setBtnHover] = useState(false)

  return (
    <>
      {/* FLOWSTACY wordmark — opacity driven by bloom³ in FluidCanvas tick */}
      <div
        ref={wordmarkRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: 0,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(28px, 4.4vw, 58px)',
          letterSpacing: '0.3em',
          textIndent: '0.3em',
          color: '#ffffff',
          whiteSpace: 'nowrap',
          textShadow: '0 0 60px rgba(255,255,255,0.45), 0 0 120px rgba(255,255,255,0.2)',
          zIndex: 10,
          userSelect: 'none',
        }}
      >
        FLOWSTACY
      </div>

      {/* Bottom content: supporting copy + CTA */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: '7%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
          zIndex: 10,
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(15px, 1.6vw, 21px)',
            lineHeight: 1.5,
            color: '#ffffff',
            opacity: 0.55,
            letterSpacing: '0.04em',
          }}
        >
          The science of consistency. The art of becoming.
        </p>

        <a
          href="#"
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 38px',
            borderRadius: '999px',
            background: 'var(--color-accent-teal, #1D9E75)',
            color: '#000000',
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 500,
            fontSize: '15px',
            letterSpacing: '0.03em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'box-shadow 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)',
            boxShadow: btnHover ? '0 0 36px rgba(29,158,117,0.55)' : '0 0 0px rgba(29,158,117,0)',
            transform: btnHover ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          Begin your journey →
        </a>
      </div>

      {/* "move to awaken" hint — fades out on first pointer move */}
      <div
        ref={hintRef}
        style={{
          position: 'fixed',
          bottom: '18px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          opacity: 1,
          transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1)',
          animation: 'hintPulse 2.4s ease-in-out infinite',
        }}
      >
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 200,
            fontSize: '12px',
            letterSpacing: '0.18em',
            color: '#ffffff',
            opacity: 0.35,
            textTransform: 'uppercase',
          }}
        >
          move to awaken
        </span>
      </div>

      <style>{`
        @keyframes hintPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </>
  )
}
