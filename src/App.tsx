import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails';
import './App.css';
import PokemonsList from './components/PokemonsList';

const App: React.FC = () => (
  <Router>
    <div className="App min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-blue-50 to-pink-50">
      <header className="App-header bg-slate-900">
        <h1 className="text-2xl font-mono text-yellow-400 font-bold p-4 text-center">Pokémon</h1>
      </header>
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<PokemonsList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </div>
      <footer className="App-footer bg-slate-900 text-white text-center p-4">
        <p className='font-mono'>Made with ❤️ by Gilbert Habimana</p>
      </footer>
    </div>
  </Router>
);

export default App;