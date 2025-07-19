import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonByName } from '../api/index';

type PokemonSpritesOther = {
  [key: string]: {
    front_default?: string;
  };
};

type PokemonSprites = {
  front_default?: string;
  other?: PokemonSpritesOther;
};

type PokemonType = {
  type: {
    name: string;
  };
};

type PokemonAbility = {
  ability: {
    name: string;
  };
};

type PokemonStat = {
  stat: {
    name: string;
  };
  base_stat: number;
};

type Pokemon = {
  name: string;
  sprites: PokemonSprites;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  base_experience: number;
  order: number;
};

const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setError('');
      if (name) {
        try {
          const data = await getPokemonByName(name);
          setPokemon(data);
          if (!data) setError('Failed to fetch Pokémon. Please try again.');
        } catch {
          setError('Failed to fetch Pokémon. Please try again.');
        }
      }
      setLoading(false);
    };
    fetchDetails();
  }, [name]);

  if (loading) {
    return <div className="text-center text-lg py-8 font-mono">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8 font-mono">{error}</div>;
  }

  if (!pokemon) {
    return <div className="text-center text-red-500 py-8 font-mono">Pokemon not found.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-100 via-blue-100 to-pink-100 px-2 py-6 font-mono flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-4 sm:p-8 flex flex-col gap-8 relative">
        <Link
          to="/"
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 text-base sm:text-lg font-bold z-10"
        >
          &larr; Back
        </Link>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="bg-white rounded-full shadow-xl p-2 sm:p-6 mb-4 border-4 border-yellow-300 flex items-center justify-center">
            <img
              src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
              alt={pokemon.name}
              className="w-40 h-40 sm:w-56 sm:h-56 object-contain"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold capitalize mb-2 text-slate-900 tracking-wide drop-shadow text-center">
            {pokemon.name}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-100 rounded-xl px-4 py-2 text-slate-700 font-semibold shadow flex flex-col items-center justify-center">
            <span className="block text-xs font-bold text-slate-500">Height</span>
            <span className="font-normal text-sm">{pokemon.height}</span>
          </div>
          <div className="bg-slate-100 rounded-xl px-4 py-2 text-slate-700 font-semibold shadow flex flex-col items-center justify-center">
            <span className="block text-xs font-bold text-slate-500">Weight</span>
            <span className="font-normal text-sm">{pokemon.weight}</span>
          </div>
          <div className="bg-slate-100 rounded-xl px-4 py-2 text-slate-700 font-semibold shadow flex flex-col items-center justify-center">
            <span className="block text-xs font-bold text-slate-500">Base Exp</span>
            <span className="font-normal text-sm">{pokemon.base_experience}</span>
          </div>
          <div className="bg-slate-100 rounded-xl px-4 py-2 text-slate-700 font-semibold shadow flex flex-col items-center justify-center">
            <span className="block text-xs font-bold text-slate-500">Order</span>
            <span className="font-normal text-sm">{pokemon.order}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <span className="font-semibold text-slate-800 mb-2 block text-lg">Types</span>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((typeObj) => (
                <span
                  key={typeObj.type.name}
                  className="capitalize bg-yellow-200 text-slate-900 px-4 py-2 rounded-full text-base font-bold shadow text-center"
                >
                  {typeObj.type.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <span className="font-semibold text-slate-800 mb-2 block text-lg">Abilities</span>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((abilityObj) => (
                <span
                  key={abilityObj.ability.name}
                  className="capitalize bg-blue-200 text-slate-900 px-4 py-2 rounded-full text-base font-medium shadow text-center"
                >
                  {abilityObj.ability.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <span className="font-semibold text-slate-800 mb-2 block text-lg">Base Stats</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pokemon.stats.map((statObj) => (
              <div
                key={statObj.stat.name}
                className="bg-gray-100 rounded-xl px-3 py-2 text-gray-800 text-base font-medium shadow flex flex-col items-center justify-center"
              >
                <span className="capitalize font-bold text-sm">{statObj.stat.name}</span>
                <span className="text-sm">{statObj.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;