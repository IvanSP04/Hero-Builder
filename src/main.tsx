import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import App from './App.tsx'
import './style.css'
import splashLogo from './assets/splash_logo.png'

const splash = document.createElement('div')
splash.id = 'splash'
splash.innerHTML = `<img src="${splashLogo}" alt="logo" />`
document.body.appendChild(splash)

setTimeout(() => {
  splash.style.opacity = '0'
  setTimeout(() => splash.remove(), 500)
}, 2000)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)