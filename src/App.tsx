import { useEffect, useRef } from 'react'
import CustomCursor from './components/CustomCursor'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import BeyondTheCode from './components/BeyondTheCode'
import CurrentlyExploring from './components/CurrentlyExploring'
import Skills from './components/Skills'
import HowIBuild from './components/HowIBuild'
import WhatIBuild from './components/WhatIBuild'
import Projects from './components/Projects'
import CurrentlyBuilding from './components/CurrentlyBuilding'
import Hackathons from './components/Hackathons'
import Journey from './components/Journey'
import TheLab from './components/TheLab'
import Terminal from './components/Terminal'
import Contact from './components/Contact'

function App() {
  const noiseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Prevent default cursor on desktop
    document.documentElement.style.cursor = 'none'
    return () => {
      document.documentElement.style.cursor = ''
    }
  }, [])

  return (
    <>
      {/* Noise texture overlay */}
      <div ref={noiseRef} className="noise" aria-hidden="true" />

      {/* Custom cursor - desktop only */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content - Complete Story Narrative */}
      <main>
        {/* WHO I AM */}
        <Hero />
        <About />

        {/* WHAT I CARE ABOUT */}
        <BeyondTheCode />

        {/* WHAT I'M LEARNING */}
        <CurrentlyExploring />
        <Skills />

        {/* HOW I BUILD */}
        <HowIBuild />

        {/* WHAT I'VE BUILT & FOCUS AREAS */}
        <WhatIBuild />
        <Projects />

        {/* WHAT I'M BUILDING NOW */}
        <CurrentlyBuilding />

        {/* WHERE I'M GOING & EXPERIENCES */}
        <Hackathons />
        <Journey />
        <TheLab />

        {/* INTERACTIVE DIGITAL TERMINAL */}
        <Terminal />

        {/* CONTACT & CONNECT */}
        <Contact />
      </main>
    </>
  )
}

export default App
