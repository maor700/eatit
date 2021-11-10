import { useState } from 'react'
import logo from './assets/eatit.png';
import * as ReactDOM from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import './App.less'
import { Ingredients } from './Ingredients/Ingredients';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/recipes" element={<h2>recipes</h2>} />
            <Route path="/recipe-details" element={<h1>Recipe Details</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>

  )
}

export default App
