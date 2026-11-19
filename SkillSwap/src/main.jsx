import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'swiper/css'
import './index.css'
import App from './App.jsx'

AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 55 })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
