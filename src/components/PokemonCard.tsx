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
  <div className="bg-white rounded-2xl shadow-lg grid grid-rows-[auto,1fr] place-items-center p-6 m-4 hover:scale-105 transition-transform cursor-pointer">
    <div className="bg-white rounded-full shadow-xl p-4 mb-4 border-4 border-yellow-200 grid place-items-center">
      <img
        src={getPokemonImage(url)}
        alt={name}
        className="w-24 h-24 object-contain"
      />
    </div>
    <p className="text-xl font-extrabold font-mono capitalize text-slate-900 tracking-wide drop-shadow text-center">{name}</p>
  </div>
);

export default PokemonCard;
