import React from "react";

const PokemonCard = ({ pokemonData }) => {
  if (
    !pokemonData ||
    !pokemonData.image ||
    !pokemonData.types ||
    !pokemonData.stats
  ) {
    return null;
  }

  return (
    <div className="w-72 bg-white shadow-lg rounded-2xl p-4 m-4 flex flex-col items-center transition-transform transform hover:scale-105">
      <p className="text-sm text-gray-500 self-start">ID: {pokemonData.id}</p>

      <img
        src={pokemonData.image}
        alt={pokemonData.name}
        className="w-32 h-32 object-contain my-2"
      />

      <h3 className="text-xl font-bold capitalize text-gray-800 mb-2">
        {pokemonData.name}
      </h3>

      <div className="flex flex-wrap justify-center gap-2 mb-3">
        {pokemonData.types.map((curType, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gradient-to-r from-blue-300 to-blue-500 text-white text-xs rounded-full shadow-sm"
          >
            {curType.type.name}
          </span>
        ))}
      </div>

      <div className="w-full">
        <h4 className="text-sm font-semibold text-gray-700 mb-1">Stats:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {pokemonData.stats.map((curStat, index) => (
            <li key={index} className="flex justify-between">
              <span className="capitalize">{curStat.stat.name}</span>
              <span>{curStat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
