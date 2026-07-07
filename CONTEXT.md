# Flowstacy Landing — Project Context

## Stack
- Vite + React
- Tailwind v4 with @theme CSS variables in index.css
- Motion (import from 'motion/react')
- Inter font via Google Fonts

## Design Tokens
- Background: #000000 (pure black throughout)
- Accent teal: #1D9E75
- Accent lavender: #9D92F8
- Accent coral: #FF4D6D
- Hero-only colors: #FF4D6D, #A8FF3E, #1A6FFF, #FFB830
- Font headlines: Inter 800
- Font body: Inter 400

## Visual Rules
- Hero animation ends completely at section boundary
- Sections 2+ use ONLY teal, lavender, coral as accents
- No lime green or gold below the hero
- All backgrounds pure #000000
- Hyphens: none on all text elements
- No word-break

## File Structure
src/
  components/
    FluidCanvas.jsx      — hero cosmic animation
    HeroText.jsx         — hero text layer
    HookSection.jsx      — Section 2: Philosophy
    ShiftSection.jsx     — Section 3: The Shift
    HowItWorks.jsx       — Section 4: How It Works
    ForYouSection.jsx    — Section 5: Cinematic text sequence / "Who is Flowstacy for?"
  App.jsx
  index.css

## Sections Built
1. Hero — cosmic animation, FLOWSTACY emerges on interaction
2. HookSection — "Talent is something you nourish."
3. ShiftSection — traveling dot activates MIND / HABITS / IDENTITY cards
4. HowItWorks — five steps, alternating layout, sticky progress indicator,
   glassmorphism tilt cards, IntersectionObserver step tracking

## Sections To Build
6. SocialProof — quotes, scroll-triggered
7. FinalCTA — full width, teal pill, heartbeat pulse

## Interaction Patterns
- Text sweep: gradient travels left to right on hover
- Cards: teal glow border on hover, scale 1.02
- Line animations: draw on scroll using Motion whileInView
- All easing: cubic-bezier(0.22, 1, 0.36, 1)
- Never linear

## Session Workflow
1. Read CONTEXT.md first every session
2. Build one section per prompt
3. Screenshot after every build
4. No full rebuilds — surgical fixes only
