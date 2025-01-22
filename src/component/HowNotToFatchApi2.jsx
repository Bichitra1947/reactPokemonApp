import React, { useEffect, useState } from "react";

const HowNotToFatchApi2 = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const api = "https://pokeapi.co/api/v2/pokemon/squirtle";
  const pokemon = async () => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      setApiData(data);
      setLoading(false);
    } catch (error) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    pokemon();
  }, []);

  if (loading) {
    return <div>Data Loading ...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <div>
        {apiData.name}
        <img
          src={apiData.sprites.other.dream_world.front_default}
          alt=""
          height="300px"
          width="300px"
        />
      </div>
    </>
  );
};

export default HowNotToFatchApi2;
