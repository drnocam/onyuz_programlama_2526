import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Resimler from './Resimler'
import Birinci from './diger/birinci'
import BenimTablom from './diger/tablom'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState<'home' | 'subpage'>('home')

  const openSubpage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setPage('subpage')
  }

  const openHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setPage('home')
  }

  if (page === 'subpage') {
    return (
       <Birinci />
    )
  }

  return (
    <>
      <section id="center">
        <h1>TBMYO</h1>
        <Resimler />
        <BenimTablom />
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <a href="#subpage" className="page-link" onClick={openSubpage}>
          Diğer Sayfa
        </a>
      </section>

      <div className="ticks"></div>

    

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
