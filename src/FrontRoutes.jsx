import React from 'react'
import { Route, Routes } from 'react-router'
import Registration from './components/pages/Auth/Registration'
import App from './App'


export default function FrontRoutes() {
  return (
    <>
        <Routes>
            <Route path="/auth" element={<Registration/>} />
        </Routes>
    </> 
  )
}
