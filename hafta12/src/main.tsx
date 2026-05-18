import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Ayarlar from './sayfalar/Ayarlar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/settings" element={<Ayarlar />} />  
        <Route path="/yazi" element={<h1>Yazılar</h1>} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
