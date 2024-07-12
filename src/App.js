import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashBoard />} />
            {/* <Route path="/coin/:id" element={<Coin />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/watchlist" element={<Watchlist />} /> */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
