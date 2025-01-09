import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ModalProvider from './context/ModalContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
          <ModalProvider>
              <App />
          </ModalProvider>
    </BrowserRouter>
  </StrictMode>
)
