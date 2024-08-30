import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'; {/* Required import in order to use bootstrap CSS classes */}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/*Renders App.jsx file*/}
  </StrictMode>,
)
