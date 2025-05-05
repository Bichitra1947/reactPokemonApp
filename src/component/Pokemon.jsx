import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrors] = useState(null);
  const [search, setSearch] = useState("");
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const api = "https://pokeapi.co/api/v2/pokemon";

  const fetchPokemon = async (url) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setNextUrl(data.next);
      setPrevUrl(data.previous);

      const pokemonDetails = data.results.map(async (urlObj) => {
        const res = await fetch(urlObj.url);
        const data = await res.json();
        return {
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          types: data.types,
          stats: data.stats,
        };
      });

      const promiseResponse = await Promise.all(pokemonDetails);
      setPokemon(promiseResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrors(error);
      setLoading(false);
    }
  };

  const fetchPokemonByNames = async (names) => {
    try {
      setLoading(true);
      const requests = names.map(name =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => res.json())
      );

      const dataList = await Promise.all(requests);
      const result = dataList.map(data => ({
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        types: data.types,
        stats: data.stats,
      }));

      setPokemon(result);
      setNextUrl(null);
      setPrevUrl(null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching filtered Pokémon:", error);
      setPokemon([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(api);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
        const data = await res.json();
        setAllPokemon(data.results); // contains name + url
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };
    fetchAll();
  }, []);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setSuggestions([]);
      fetchPokemon(api);
      return;
    }

    const filteredNames = allPokemon
      .filter(poke => poke.name.startsWith(value.toLowerCase()))
      .map(p => p.name)
      .slice(0, 10);

    setSuggestions(filteredNames);

    if (filteredNames.length > 0) {
      await fetchPokemonByNames(filteredNames);
    } else {
      setPokemon([]);
    }
  };

  const handleNext = () => {
    if (nextUrl) {
      setSearch("");
      setSuggestions([]);
      fetchPokemon(nextUrl);
    }
  };

  const handlePrevious = () => {
    if (prevUrl) {
      setSearch("");
      setSuggestions([]);
      fetchPokemon(prevUrl);
    }
  };

  if (loading) {
    return <h2 className="text-center text-xl font-semibold mt-10">Data Loading....</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-600 font-semibold mt-10">{error.message}</h2>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 text-center relative">
        <h2 className="text-3xl font-bold mb-4">Pokémon Card</h2>
        <label className="font-semibold mr-2">Search Name:</label>
        <input
          type="text"
          placeholder="Search Pokémon by name"
          value={search}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {suggestions.length > 0 && search.trim() !== "" && (
          <ul className="bg-white border border-gray-300 rounded-md w-64 mx-auto text-left shadow mt-1 max-h-48 overflow-y-auto z-10 absolute left-1/2 transform -translate-x-1/2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearch(suggestion);
                  setSuggestions([]);
                  fetchPokemonByNames([suggestion]);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemon.length > 0 ? (
            pokemon.map((poke) => (
              <PokemonCard key={poke.id} pokemonData={poke} />
            ))
          ) : (
            <h3 className="text-center text-lg font-medium mt-4">No Pokémon Found</h3>
          )}
        </div>
      </div>

      {search.trim() === "" && (
        <div className="flex justify-center gap-4 my-8">
          <button
            onClick={handlePrevious}
            disabled={!prevUrl}
            className={`px-6 py-2 text-white rounded-md ${
              prevUrl ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!nextUrl}
            className={`px-6 py-2 text-white rounded-md ${
              nextUrl ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pokemon;
