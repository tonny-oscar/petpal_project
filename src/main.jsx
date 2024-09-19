import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FirebaseImageUpload from './components/MemoryComponent/fireBaseImageUpload/FirebaseImageUpload';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <FirebaseImageUpload />
  </StrictMode>,
)
