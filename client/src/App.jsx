import React from 'react'
import { Routes, Route } from "react-router"
import Movie from './pages/Movie'

export default function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",  
      minHeight: "100vh"
    }}>
      <header>Stream from china</header>
      <main style={{flexGrow: 1}}></main>
      <Routes>
        <Route path="/" element={<h1>Main</h1>}/>
        <Route path="/movie/:id" element={<Movie/>}/>
        <Route path="/*" element={<h1>NotFound</h1>}/>
      </Routes>
      <footer>
        &copy, {new Date().getFullYear()} Company Dominos shibal me Pizza hut shibal me
      </footer>
    </div>
  )
}
