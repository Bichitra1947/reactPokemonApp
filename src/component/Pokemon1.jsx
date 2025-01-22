import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Pokemon1 = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrors] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const api = "https://pokeapi.co/api/v2/pokemon?limit=20";

  const fetchPokemon = async (url) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();

      setPokemon(data.results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      setLoading(false);
    } catch (error) {
      setErrors(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(api);
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Data Loading....</h2>;
  }

  if (error) {
    return <h2 style={{ textAlign: "center" }}>{error.message}</h2>;
  }

  return (
    <>
      <div className="container m-4" style={{ textAlign: "center" }}>
        <h2>Pokemon List</h2>
        <div className="row row-cols-1 row-cols-2 row-cols-lg-4 g-4">
          {pokemon.map((poke, index) => (
            <div className="col" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{poke.name}</h5>
                  <a
                    href={poke.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container text-center mt-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => fetchPokemon(prevUrl)}
          disabled={!prevUrl}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => fetchPokemon(nextUrl)}
          disabled={!nextUrl}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pokemon1;
