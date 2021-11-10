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
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div>What do you have?</div>
            <input></input>
          </div>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/ingredients" element={<h1>Ingredients editor</h1>} />
          <Route path="/recipes" element={<h1>Recipes List</h1>} />
          <Route path="/recipe-details" element={<h1>Recipe Details</h1>} />
        </Routes>
        </div>
      </BrowserRouter>,
    </>

  )
}

export default App
