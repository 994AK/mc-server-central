// src/main.tsx
import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import AppRoutes from './routes'

const container = document.getElementById('root')
const root = createRoot(container!) // 需要断言非空

root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
)
