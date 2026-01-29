import { useState, useEffect } from 'react'
import Canvas from './components/Canvas/Canvas'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import ExampleCard from './components/ExampleCard/ExampleCard'
import CombinationCard from './components/CombinationCard/CombinationCard'
import './styles/index.scss'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  // Generate example numbers for each category
  const units = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const tens = [10, 20, 30, 40, 50, 60, 70, 80, 90]
  const hundreds = [100, 200, 300, 400, 500, 600, 700, 800, 900]
  const thousands = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000]
  
  // Example combinations
  const combinations = [1992, 2024, 4723, 9999]

  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <div className="header__title">
            <div className="title-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22"/>
                <line x1="12" y1="2" x2="18" y2="2"/>
                <line x1="6" y1="22" x2="12" y2="22"/>
              </svg>
            </div>
            <h1>Cistercian Numerals</h1>
          </div>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="main-content">
        <section className="hero fade-in">
          <h2 className="hero__title">
            Medieval Number System
            <span>Developed by Cistercian monks in the 13th century</span>
          </h2>
          <p className="hero__description">
            This elegant system represents any number from 1 to 9999 using a single symbol. 
            Each digit occupies a different quadrant around a central vertical line called the stave.
          </p>
        </section>

        <section className="converter-section">
          <div className="converter-card">
            <h3 className="converter-card__title">Number Converter</h3>
            <Canvas />
          </div>
          
          <div className="converter-card">
            <h3 className="converter-card__title">How It Works</h3>
            <div style={{ padding: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1rem' }}>
                The Cistercian numeral system divides the space around a central stave into four quadrants:
              </p>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    background: 'var(--units-color)',
                    flexShrink: 0
                  }}></span>
                  <strong style={{ color: 'var(--units-color)' }}>Units (1-9)</strong> — Top Right
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    background: 'var(--tens-color)',
                    flexShrink: 0
                  }}></span>
                  <strong style={{ color: 'var(--tens-color)' }}>Tens (10-90)</strong> — Top Left
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    background: 'var(--hundreds-color)',
                    flexShrink: 0
                  }}></span>
                  <strong style={{ color: 'var(--hundreds-color)' }}>Hundreds (100-900)</strong> — Bottom Right
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    background: 'var(--thousands-color)',
                    flexShrink: 0
                  }}></span>
                  <strong style={{ color: 'var(--thousands-color)' }}>Thousands (1000-9000)</strong> — Bottom Left
                </li>
              </ul>
              <p style={{ marginTop: '1.5rem' }}>
                Enter a number between 1 and 9999 to see its Cistercian representation, 
                then download the SVG to use in your projects.
              </p>
            </div>
          </div>
        </section>

        <section className="examples-section">
          <div className="examples-section__header">
            <h2>Reference Guide</h2>
            <p>All digit patterns organized by place value</p>
          </div>

          <div className="digit-category digit-category--units">
            <div className="digit-category__header">
              <h3>Units</h3>
              <span>1–9 • Top Right</span>
            </div>
            <div className="example-cards">
              {units.map(num => (
                <ExampleCard key={num} number={num} category="units" />
              ))}
            </div>
          </div>

          <div className="digit-category digit-category--tens">
            <div className="digit-category__header">
              <h3>Tens</h3>
              <span>10–90 • Top Left</span>
            </div>
            <div className="example-cards">
              {tens.map(num => (
                <ExampleCard key={num} number={num} category="tens" />
              ))}
            </div>
          </div>

          <div className="digit-category digit-category--hundreds">
            <div className="digit-category__header">
              <h3>Hundreds</h3>
              <span>100–900 • Bottom Right</span>
            </div>
            <div className="example-cards">
              {hundreds.map(num => (
                <ExampleCard key={num} number={num} category="hundreds" />
              ))}
            </div>
          </div>

          <div className="digit-category digit-category--thousands">
            <div className="digit-category__header">
              <h3>Thousands</h3>
              <span>1000–9000 • Bottom Left</span>
            </div>
            <div className="example-cards">
              {thousands.map(num => (
                <ExampleCard key={num} number={num} category="thousands" />
              ))}
            </div>
          </div>

          <div className="combinations">
            <div className="combinations__header">
              <h3>Example Combinations</h3>
              <p>See how multiple digits combine into single symbols</p>
            </div>
            <div className="combinations__grid">
              {combinations.map(num => (
                <CombinationCard key={num} number={num} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          The Cistercian numeral system was developed by Cistercian monks in the early 13th century. 
          It allows any number from 1 to 9999 to be represented by a single glyph.
        </p>
      </footer>
    </div>
  )
}

export default App
