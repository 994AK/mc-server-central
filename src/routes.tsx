import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import WhitelistAdd from './pages/WhitelistAdd'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whitelist_add" element={<WhitelistAdd />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
