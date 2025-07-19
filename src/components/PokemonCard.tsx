import React from 'react';

type PokemonCardProps = {
  name: string;
  url: string;
};

const getPokemonImage = (url: string) => {
  const id = url.split('/').filter(Boolean).pop();
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => (
  <div className="pokemon-card bg-blue-100 rounded-lg shadow-md flex flex-col items-center p-6 m-4 hover:scale-105 transition-transform">
    <img
      src={getPokemonImage(url)}
      alt={name}
      className="w-50 h-50 mb-2"
    />
    <p className="text-2xl font-semibold font-stretch-expanded capitalize">{name}</p>
  </div>
);

export default PokemonCard;
