import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemonData }) => {
  if (!pokemonData || !pokemonData.image || !pokemonData.types || !pokemonData.stats) {
    return null;
  }

  return (
    <div className="pokemon-card">
        <p>{pokemonData.id}</p>
      <img
        src={pokemonData.image}
        alt={pokemonData.name}
        className="pokemon-card__image"
      />
      <h4 className="pokemon-card__types">
        {pokemonData.types.map((curType, index) => (
          <span key={index} className="pokemon-card__type">
            {curType.type.name}
          </span>
        ))}
      </h4>
      <p className="pokemon-card__stats">
        {pokemonData.stats.map((curStat, index) => (
          <span key={index} className="pokemon-card__stat">
            {curStat.stat.name}: {curStat.base_stat} 
          </span>
        ))}
      </p>
      <h3 className="pokemon-card__name">{pokemonData.name}</h3>
    </div>
  );
};

export default PokemonCard;
