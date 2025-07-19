import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemons } from '../api/index';
import PokemonCard from './PokemonCard';

const LIMIT = 20;

const PokemonsList: React.FC = () => {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getPokemons(LIMIT, offset);
        setPokemons(data.results);
        setCount(data.count);
      } catch (err) {
        setError('Failed to fetch Pokémon. Please try again.');
      }
      setLoading(false);
    };
    fetchPokemons();
  }, [offset]);

  const handleCardClick = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(count / LIMIT);
  const currentPage = offset / LIMIT + 1;

  const handlePrev = () => {
    if (offset >= LIMIT) setOffset(offset - LIMIT);
  };

  const handleNext = () => {
    if (offset + LIMIT < count) setOffset(offset + LIMIT);
  };

  return (
    <main className="p-6 font-mono">
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs font-mono focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      {error && (
        <p className="text-center text-red-500 font-mono mb-4">{error}</p>
      )}
      {loading ? (
        <p className="text-center font-mono text-lg">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
            {filteredPokemons.map((pokemon) => (
              <div
                key={pokemon.name}
                onClick={() => handleCardClick(pokemon.name)}
                className="cursor-pointer"
              >
                <PokemonCard name={pokemon.name} url={pokemon.url} />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={handlePrev}
              disabled={offset === 0}
              className="px-4 py-2 bg-slate-900 text-white rounded-full font-mono shadow hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              &larr; Previous
            </button>
            <span className="font-mono px-4 py-2 text-slate-900  text-lg font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={offset + LIMIT >= count}
              className="px-4 py-2 bg-slate-900 text-white rounded-full font-mono shadow hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next &rarr;
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default PokemonsList;