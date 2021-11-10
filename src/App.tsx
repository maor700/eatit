import { useState } from 'react'
import logo from './assets/eatit.png';
import * as ReactDOM from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div>What do you have?</div>
            <input></input>
          </header>
        </div>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="about" element={<div>About</div>} />
        </Routes>
      </BrowserRouter>,
    </>

  )
}

export default App
