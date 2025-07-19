import React, { useEffect, useState } from 'react';
import { getPokemons } from './api/index';
import PokemonCard from './components/PokemonCard';
import './App.css';

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await getPokemons(50);
      setPokemons(data);
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  return (
    <div className="App min-h-screen bg-gray-50">
      <header className="App-header bg-slate-900">
        <h1 className="text-4xl text-yellow-400 font-bold p-4 text-center">Pokemon</h1>
      </header>
      <main className="py-6">
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : (
          <div className="pokemon-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
            ))}
          </div>
        )}
      </main>
      <footer className="App-footer bg-slate-900 text-white text-center p-4">
        <p>Made with ❤️ by Gilbert Habimana</p>
      </footer>
    </div>
  );
};

export default App;
