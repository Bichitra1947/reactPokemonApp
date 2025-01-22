import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Pokemon from './component/Pokemon.jsx'
import Pokemon1 from './component/Pokemon1.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pokemon />
  </StrictMode>,
)
