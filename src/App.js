import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import CoinPage from './pages/CoinPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashBoard />} />
             <Route path="/coin/:id" element={<CoinPage /> } />
            {/* <Route path="/compare" element={<Compare />} />
            <Route path="/watchlist" element={<Watchlist />} /> */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
