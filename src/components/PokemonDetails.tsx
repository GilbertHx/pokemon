import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonByName } from '../api/index';

const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (name) {
        const data = await getPokemonByName(name);
        setPokemon(data);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [name]);

  if (loading) {
    return <div className="text-center text-lg py-8 font-mono">Loading...</div>;
  }

  if (!pokemon) {
    return <div className="text-center text-red-500 py-8 font-mono">Pokemon not found.</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10 flex flex-col font-mono">
      <Link to="/" className="text-blue-600 hover:text-blue-800 underline mb-6 block text-lg font-medium self-start font-mono">&larr; Back</Link>
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-full shadow-xl p-6 mb-6 border-4 border-yellow-200 flex justify-center items-center">
          <img
            src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="w-40 h-40 object-contain"
          />
        </div>
        <h2 className="text-4xl font-extrabold capitalize mb-4 text-slate-900 tracking-wide drop-shadow text-center font-mono">{pokemon.name}</h2>
        <div className="flex flex-row justify-center gap-6 mb-6 w-full">
          <div className="bg-slate-100 rounded-lg px-4 py-2 text-slate-700 font-semibold shadow flex flex-col items-center w-1/2 font-mono">
            <span className="block text-xs font-bold text-slate-500 font-mono">Height</span>
            <span className="font-normal text-lg font-mono">{pokemon.height}</span>
          </div>
          <div className="bg-slate-100 rounded-lg px-4 py-2 text-slate-700 font-semibold shadow flex flex-col items-center w-1/2 font-mono">
            <span className="block text-xs font-bold text-slate-500 font-mono">Weight</span>
            <span className="font-normal text-lg font-mono">{pokemon.weight}</span>
          </div>
        </div>
        <div className="mb-4 w-full flex flex-col items-center font-mono">
          <span className="font-semibold text-slate-800 mb-2 font-mono">Types</span>
          <div className="flex flex-wrap justify-center gap-2 w-full font-mono">
            {pokemon.types.map((typeObj: any) => (
              <span
                key={typeObj.type.name}
                className="capitalize inline-block bg-yellow-200 text-slate-900 px-3 py-1 rounded-full text-sm font-bold shadow font-mono"
              >
                {typeObj.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-2 w-full flex flex-col items-center font-mono">
          <span className="font-semibold text-slate-800 mb-2 font-mono">Abilities</span>
          <div className="flex flex-wrap justify-center gap-2 w-full font-mono">
            {pokemon.abilities.map((abilityObj: any) => (
              <span
                key={abilityObj.ability.name}
                className="capitalize inline-block bg-blue-200 text-slate-900 px-3 py-1 rounded-full text-sm font-medium shadow font-mono"
              >
                {abilityObj.ability.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-2 w-full flex flex-col items-center font-mono">
          <span className="font-semibold text-slate-800 mb-2 font-mono">Base Stats</span>
          <div className="flex flex-wrap justify-center gap-2 w-full font-mono">
            {pokemon.stats.map((statObj: any) => (
              <div
                key={statObj.stat.name}
                className="bg-gray-100 rounded px-3 py-1 text-gray-800 text-sm font-medium shadow flex flex-col items-center font-mono"
              >
                <span className="capitalize font-bold font-mono">{statObj.stat.name}</span>
                <span className="font-mono">{statObj.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-2 w-full flex flex-col items-center font-mono">
          <span className="font-semibold text-slate-800 mb-2 font-mono">Order</span>
          <div className="bg-slate-100 rounded px-3 py-1 text-slate-700 font-semibold shadow font-mono">
            {pokemon.order}
          </div>
        </div>
        <div className="mb-2 w-full flex flex-col items-center font-mono">
          <span className="font-semibold text-slate-800 mb-2 font-mono">Base Experience</span>
          <div className="bg-slate-100 rounded px-3 py-1 text-slate-700 font-semibold shadow font-mono">
            {pokemon.base_experience}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;