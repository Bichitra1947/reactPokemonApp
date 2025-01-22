import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PokemonCard from "./PokemonCard";
import "./Pokemon.css";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrors] = useState(null);
  const [search, setSearch] = useState("");
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const api = "https://pokeapi.co/api/v2/pokemon";

  const fetchPokemon = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      const pokemonDetails = data.results.map(async (urlObj) => {
        const res = await fetch(urlObj.url);
        const data = await res.json();
        console.log(data)
        return {
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          types: data.types,
          stats: data.stats,
        };
      });
    //   const fetchPokemonBtn = async (url) => {
    //     try {
    //       setLoading(true);
    //       const res = await fetch(url);
    //       const data = await res.json();

    //       setPokemon(data.results);
    //       setNextUrl(data.next);
    //       setPrevUrl(data.previous);
    //       setLoading(false);
    //     } catch (error) {
    //       setErrors(error);
    //       setLoading(false);
    //     }
    //   };
      const promiseResponse = await Promise.all(pokemonDetails);
      setPokemon(promiseResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrors(error);
    }
  };
  const handleNext = () => {
    if (nextUrl) {
      fetchPokemon(nextUrl);
    }
  };

  const handlePrevious = () => {
    if (prevUrl) {
      fetchPokemon(prevUrl);
    }
  };

  useEffect(() => {
    fetchPokemon(api);
  }, []);

  // Filter Pokémon based on the search term
  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Data Loading....</h2>;
  }
  if (error) {
    return <h2 style={{ textAlign: "center" }}>{error.message}</h2>;
  }

  return (
    <>
      <div className="container m-4" style={{ textAlign: "center" }}>
        <h2>Pokemon Card</h2>
        <label htmlFor="">
          <b>Search Name: </b>
        </label>{" "}
        <span> </span>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="row row-cols-1 row-cols-3 row-cols-lg-4 g-4">
          {filteredPokemon.length > 0 ? (
            filteredPokemon.map((poke) => (
              <div className="col" key={poke.id}>
                <PokemonCard pokemonData={poke} />
              </div>
            ))
          ) : (
            <h3 style={{ textAlign: "center", marginTop: "20px" }}>
              No Pokémon Found
            </h3>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between my-3 container">
        <div className="container text-center mt-4">
          <button
            className="btn btn-primary me-2"
            onClick={handlePrevious}
            disabled={!prevUrl}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!nextUrl}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
